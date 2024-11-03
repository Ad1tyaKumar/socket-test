import express from 'express';
const router = express.Router();

router.post("/test", (req, res) => {
    const { index } = req.body;
    console.log(req);
    
    res.json({
        success: true,
        index 
    })
});

export default router;