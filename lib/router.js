const express = require('express');
const router = express.Router();
const {  Worker } = require('worker_threads');
const THREAD_COUNT = 4;

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/blocking', async(req, res) => {
    // const worker = new Worker('./lib/worker.js');
    // worker.on('message', (data) => {
    //     return res.send(`Blocking operation completed. Counter: ${data.counter}`);
    // })
    // worker.on('error', (err) => {
    //     res.send(err.message);
    // })
    const workPromises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
        workPromises.push(createWorker());
    }
    const results = await Promise.all(workPromises);

    //to sum up the code
    const counter = results.reduce((acc, counter) => acc + counter, 0);
   
    clearTimeout(createWorker);
    clearTimeout(workPromises);
    clearTimeout(results);
    res.send(`Blocking operation completed. Counter: ${counter}`);  
     clearTimeout(counter);
});
function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./lib/worker.js', {
            workerData: { thread_count: THREAD_COUNT }
        
        });
        worker.on('message', (data) => {
            console.log(data);
            resolve(data.counter);
        });
        worker.on('error', (err) => {
            reject(err);
        });
    });
};
router.get('/Nonblocking', (req, res) => {
    let counter = 0;
    res.send(`Non Blocking operation completed. Counter: ${counter}`);
});
module.exports = router;