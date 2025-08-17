const express = require('express');
const fs = require('fs');
const path = require('path');


  exports.addImageTemp = async (req, res) => {
    const imageUrls = req.files.map((file) => `http://localhost:3000/static/temp/${file.filename}`);
    res.json({ success: true, imageUrls });
  }

  exports.addImage = async (req, res) => {
    const { imagePaths } = req.body;

    try {
        const Paths = Array.isArray(imagePaths) ? imagePaths : [imagePaths]; // 保证是数组
        console.log(Paths)
      const finalImages = [];
  
      imagePaths.forEach(imgPath => {
        if (imgPath.includes('/static/temp/')) {
          // 只移动 temp 里的图片
          const fileName = path.basename(imgPath);
          const tempPath = path.join(__dirname, `../static/temp/${fileName}`);
          const targetPath = path.join(__dirname, `../static/${fileName}`);
  
          if (fs.existsSync(tempPath)) {
            fs.renameSync(tempPath, targetPath);
          }
          finalImages.push(`/static/${fileName}`);
        } else {
          // 已经在 static，不移动
          finalImages.push(imgPath);
        }
      });
  
      res.json({ finalImages });
    } catch (err) {
      console.error('图片移动失败:', err);
      res.status(500).json({ message: '图片移动失败' });
    }
  }

  exports.deleteTempImage = async (req, res) => {
    const { imagePath } = req.body;
    if (!imagePath) {
      return res.status(400).json({ message: 'No image path provided' });
    }
  
    // 拼接绝对路径，假设你的temp文件夹在项目根目录的 temp/
    const filePath = path.join(__dirname, '..', imagePath);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('删除文件失败', err);
        return res.status(500).json({ message: '删除文件失败' });
      }
      res.json({ message: '删除成功' });
    });
  }


  exports.deleteImage = async (req,res) => {
    const { imagePaths } = req.body;
    if (!Array.isArray(imagePaths)) {
      return res.status(400).json({ message: 'Invalid imagePaths' });
    }
  
    imagePaths.forEach(imgPath => {
      const filePath = path.join(__dirname, '..', imgPath);
      fs.unlink(filePath, err => {
        if (err) {
          console.error(`删除失败: ${filePath}`, err);
        }
      });
    });
  
    res.json({ message: 'Static images deleted successfully' });

  }