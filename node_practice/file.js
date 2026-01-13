const fs = require('fs');

// synchronous file write operation
// fs.writeFileSync('./text.txt','This is a an sync text file.');// prev content

//fs.writeFileSync('./text.txt','Hello world.'); // it will overwrite the previous content


// asynchronous file write operation
// fs.writeFile('./asyncText.txt', 'This is an async text file.', (err) => {});



//// synchronous file read operation
// const asyncTextFile = fs.readFileSync('./asyncText.txt','utf-8');
// console.log(asyncTextFile);

//Asynchronous file read operation
// fs.readFile('./text.txt','utf-8',(err, res)=>{
//     if(err){
//         console.log('Error', err);
//     }else{
//         console.log(res);
//     }
// })


// to add something in a existing text inside a file. via sync
// fs.appendFileSync('./asyncText.txt',"\n this is the add text in the file via Async")


// To copy file to one another via using Sync
// fs.cpSync('./text.txt','text-copy.txt');

// To copy file to one another via using Async
// fs.cp('./asyncText.txt','asyncText-copy.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('File copied');
//     }
// });

// Q. why we are not getting any error when we try to copy file which actaully not existsSync?

//To delete a file via sync
// fs.unlinkSync('./text-copy.txt');

//To delete a file via async
// fs.unlink('./asyncText-copy.txt', (err)=>{
//     if(err) throw err;
//     console.log('asyncTex-copy.txt deleted');
// });

// To check file status via sync
// console.log(fs.statSync('asyncText.txt'));

// To check file status via async
// fs.stat('Text.txt',(err, stats)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(stats);
//     }
// });


// to create directory or folder
// fs.mkdirSync('my-docs');

// to create a inner folders also
fs.mkdirSync('my-docs/a/b',{recursive: true});

// to add something in a existing text inside a file. via async
// fs.appendFile('text.txt',"\n this is the add text in the file",()=>{})

// fs.readFile('index.js', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//         return;
//     }
//     console.log('File contents:', data);
// });



// writeFile 
// readFile
// appendFile 
// stat
// cp 
// unlink
// mkdir 