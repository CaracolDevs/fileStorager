const fs = require('fs')
const {promisify} = require('util')
const readdir = promisify(fs.readdir)

const express = require('express')
const router = express.Router()

exports.folders = async (folder) => {
    try {
        const files = await readdir(`./uploads${folder}`);
        return files;
    } catch (error) {
        throw error
    }
}

/*
checkFolder = async (folder) => {
    try {
        const files = await readdir(`./uploads/${folder}`);
        return files;
  
    } catch (error) {
        res.send({ message: 'not Done!' })
        throw error
    }
}
    */

/*
routeFolders = async () => {
    try {
        let foldersResults = await folders()
        console.log('FOLDERS:', foldersResults)
        foldersResults.forEach(value => {
            return router.get('/test',function(req, res) {
                res.send('Birds home page');
              })
        })
        
        
    } catch (error) {
        throw error
    }

    
routeFolders()
}*/


exports.check = (req, res) => {
    try {
        const checkFiles = async (directory = `./uploads`) => {
            const files = await readdir(directory);
            console.log(files)
            return files;
        }
        checkFiles().then((content) => {
            console.log(content)
            res.render('index', {content})
        })
    } catch (error) {
        res.send({ message: 'not Done!' })
        throw error
    }
}