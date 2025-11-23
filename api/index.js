// api/index.js
const VietnameseProfileGenerator = require('../VietnameseProfileGenerator');
const generator = new VietnameseProfileGenerator();

module.exports = (req, res) => {
    // Lấy số lượng từ ?count=5 (mặc định là 1)
    const count = parseInt(req.query.count) || 1;
    
    // Giới hạn max 50 để tránh treo
    const limit = Math.min(count, 50);
    
    if (limit === 1) {
        // Trả về 1 object nếu không yêu cầu nhiều
        res.status(200).json(generator.createProfile());
    } else {
        // Trả về mảng nếu yêu cầu nhiều
        const profiles = [];
        for (let i = 0; i < limit; i++) {
            profiles.push(generator.createProfile());
        }
        res.status(200).json(profiles);
    }
};