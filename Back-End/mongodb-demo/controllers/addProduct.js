const express = require('express');
const Figure = require('../models/Product');

const path = require('path');
const fs = require('fs');

exports.addProduct = async (req, res) => {
    try {
        const figure = new Figure(req.body);
        await figure.save();
        res.status(201).json({ message: 'Figure created', figure });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  };

  exports.getAllProductBySellerId = async(req, res) => {
    try {
      const { sellerId } = req.query;
      const query = sellerId ? { seller: sellerId } : {};
      const products = await Figure.find(query).sort({ createdAt: -1 });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: '获取商品失败', error: err });
    }
  }


  exports.editProduct =async(req,res) => {
    const productId = req.params.id;
    const {
      name,
      anime,
      character,
      price,
      stock,
      rating,
      tags,
      release_date,
      images,
      description,
      height_cm,
      width_cm,
      depth_cm,
      manufacturer,
      available,
      seller,
    } = req.body;


    try {
      // const finalImagePaths = [];
  
      // for (const img of images) {
      //   if (img.includes("/temp/")) {
      //     const filename = path.basename(img);
      //     const tempPath = path.join(__dirname, `../static/temp/${filename}`);
      //     const destPath = path.join(__dirname, `../static/${filename}`);
  
      //     // Move file
      //     fs.renameSync(tempPath, destPath);
      //     finalImagePaths.push(`/static/${filename}`);
      //   } else {
      //     // Old image, keep as is
      //     finalImagePaths.push(img);
      //   }
      // }
  
      const updated = await Figure.findByIdAndUpdate(
        productId,
        {
          name,
          anime,
          character,
          price: Number(price),
          stock: Number(stock),
          rating: Number(rating),
          tags,
          release_date: release_date ? new Date(release_date) : undefined,
          images: images,
          description,
          dimensions: {
            height_cm: Number(height_cm),
            width_cm: Number(width_cm),
            depth_cm: Number(depth_cm),
          },
          manufacturer,
          available,
          seller,
        },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "产品未找到" });
      }
  
      res.status(200).json({ message: "产品编辑成功", product: updated });
    } catch (err) {
      console.error("编辑产品时出错:", err);
      res.status(500).json({ message: "服务器错误" });
    }

  }


  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Figure.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: '商品不存在' });
      }
  
      // 删除图片文件
      if (Array.isArray(product.images)) {
        product.images.forEach(imgPath => {
          const filePath = path.join(__dirname, '..', imgPath.replace(/^\/+/, ''));
          fs.unlink(filePath, err => {
            if (err) {
              console.error(`删除文件失败: ${filePath}`, err);
            }
          });
        });
      }
  
      // 删除数据库记录
      await product.deleteOne();
  
      res.json({ message: '商品及图片删除成功' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '删除商品失败' });
    }
  }
