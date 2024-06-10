import fs from 'fs-extra';
const { readdir, readFile, writeFile } = fs; 
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
import path from 'path'
const dirs = [
    "01 原子结构与元素性质", 
    "02 微粒间作用力与物质性质",
    "03 分子空间结构与物质性质",
    "04 有机化学基础",
    "05 化学物质基本概念",
    "06 元素及其化合物",
    "07 化学实验",
    "08 化学反应能量与速率",
    "09 化学平衡"
]
const Rex = /src=\".\/images(\/\s*?\S*?)+?\"/g;

let que:Promise<void>[]=[]
for(let dir of dirs)
{
    que.push(
        ((dirname: string) => {
            return new Promise<void>((resolve, reject) => {
                readdir(path.join(__dirname, `../../docs/${dir}`)).then((res) => {
                    const fileQue:Promise<void>[] = [];
                    for (let now of res) {
                        fileQue.push(((fileName:string)=>
                        {
                            return new Promise<void>((fileResolve,fileReject)=>
                            {
                                if (now === `images`) {
                                    fileResolve();
                                }
                                else {
                                    readFile(path.join(__dirname, `../../docs/${dirname}/${fileName}`),`utf-8`).then((value)=>
                                    {
                                        value = value.replace(Rex,`src="/${dirname}/images$1"`);
                                        writeFile(path.join(__dirname, `../../docs/${dirname}/${fileName}`),value,`utf-8`).then(()=>
                                        {
                                            fileResolve();
                                        })
                                    });
                                }
                            });
                        })(now));
                    }
                    Promise.all(fileQue).then(()=>
                    {
                        resolve();
                    }).catch((err)=>
                    {
                        console.error(err);
                        reject(err);
                    })
                })

            })
        })(dir))
}
await Promise.all(que)