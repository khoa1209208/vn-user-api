class VietnameseProfileGenerator {
    constructor() {
        // Dữ liệu Họ
        this.lastNames = [
            'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng',
            'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Đinh', 'Đoàn', 'Lâm', 'Trịnh',
            'Mai', 'Đào', 'Cao', 'Hà', 'Lưu', 'Lương', 'Thái', 'Châu', 'Tạ', 'Phùng',
            'Vương', 'Tiêu', 'Nghiêm', 'Phí', 'Tô', 'Từ', 'Thân', 'Trương', 'Lại'
        ];

        // Dữ liệu Tên (Nam/Nữ)
        this.firstNames = {
            male: {
                middle: ['Văn', 'Hữu', 'Đức', 'Thành', 'Quang', 'Minh', 'Bảo', 'Gia', 'Tuấn', 'Hoàng', 'Nhật', 'Anh', 'Mạnh', 'Trọng', 'Hải', 'Thanh', 'Quốc', 'Duy', 'Chí', 'Tiến', 'Đăng', 'Thiên', 'Khôi'],
                first: ['Huy', 'Minh', 'Đức', 'Nam', 'Dũng', 'Long', 'Việt', 'Trung', 'Quang', 'Hùng', 'Bảo', 'Tuấn', 'Hiếu', 'Thắng', 'Khoa', 'Phúc', 'Nguyên', 'Sơn', 'Khánh', 'Tùng', 'Thịnh', 'Kiên', 'Cường', 'Dương', 'Lâm', 'Nghĩa', 'Vinh', 'Hải', 'Bách', 'Khôi', 'Quân', 'Nhân', 'Trí']
            },
            female: {
                middle: ['Thị', 'Ngọc', 'Thu', 'Kim', 'Thanh', 'Mỹ', 'Hồng', 'Phương', 'Thảo', 'Khánh', 'Huyền', 'Tuyết', 'Mai', 'Bảo', 'Yến', 'Trúc', 'Diệu', 'Cát', 'Quỳnh', 'Anh', 'Thùy', 'Tú', 'Lan', 'Hương', 'Uyên', 'Nhã', 'Tuệ', 'Gia'],
                first: ['Anh', 'Hương', 'Mai', 'Linh', 'Hà', 'Ngọc', 'Thu', 'Huyền', 'Quỳnh', 'Trang', 'Thảo', 'Vân', 'Hằng', 'Giang', 'Nhi', 'Yến', 'Trâm', 'Duyên', 'Châu', 'Ly', 'Phương', 'Chi', 'Diệp', 'Tú', 'Nhung', 'Ngân', 'Quyên', 'Thư', 'Lan', 'Uyên', 'Vy', 'Tiên', 'Hân', 'My', 'Thủy', 'Mẫn', 'An']
            }
        };
    }

    // Tiện ích: Chọn ngẫu nhiên trong mảng hoặc chuỗi
    getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Tiện ích: Random số trong khoảng
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 1. Xử lý dấu Tiếng Việt
    removeAccents(str) {
        return str.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/đ/g, "d").replace(/Đ/g, "D");
    }

    // 2. Tạo ngày sinh (18-40 tuổi)
    generateBirthday() {
        const today = new Date();
        const currentYear = today.getFullYear();
        const minYear = currentYear - 40;
        const maxYear = currentYear - 18;

        const year = this.getRandomInt(minYear, maxYear);
        const month = this.getRandomInt(0, 11);
        const day = this.getRandomInt(1, 28); 

        return new Date(year, month, day);
    }

    // 3. Tạo Tên chi tiết
    generateNameParts(gender) {
        let ln = this.getRandomItem(this.lastNames);
        if (Math.random() < 0.15) ln += " " + this.getRandomItem(this.lastNames);
        
        const mn = this.getRandomItem(this.firstNames[gender].middle);
        const fn = this.getRandomItem(this.firstNames[gender].first);

        return { ln, mn, fn };
    }

    // 4. Tạo Username
    generateUsername(fn, ln, year) {
        const c_fn = this.removeAccents(fn).toLowerCase();
        const ln_parts = ln.split(" ");
        const c_ln = this.removeAccents(ln_parts[ln_parts.length - 1]).toLowerCase();

        const styles = [
            `${c_fn}${c_ln}${year}`,
            `${c_ln}${c_fn}${year.toString().slice(-2)}`,
            `${c_fn}.${c_ln}${year}`
        ];
        return this.getRandomItem(styles);
    }

    // 5. Tạo Password MẠNH (CẬP NHẬT MỚI)
    generatePassword() {
        // Định nghĩa các bộ ký tự
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const nums = "0123456789";
        const symbols = "@$!%*?&"; // Ký tự đặc biệt an toàn
        const allChars = lower + upper + nums + symbols;

        // Bắt buộc lấy ít nhất 1 ký tự từ mỗi bộ để đảm bảo độ mạnh
        let passwordArray = [
            this.getRandomItem(lower),
            this.getRandomItem(upper),
            this.getRandomItem(nums),
            this.getRandomItem(symbols)
        ];

        // Điền ngẫu nhiên phần còn lại (độ dài tổng từ 12-16)
        const length = this.getRandomInt(12, 16);
        while (passwordArray.length < length) {
            passwordArray.push(this.getRandomItem(allChars));
        }

        // Trộn (Shuffle) vị trí các ký tự để không bị đoán quy luật
        // Thuật toán Fisher-Yates shuffle
        for (let i = passwordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }

        return passwordArray.join('');
    }

    // --- HÀM CHÍNH ---
    createProfile() {
        const gender = Math.random() < 0.5 ? 'male' : 'female';
        const dob = this.generateBirthday();
        const { ln, mn, fn } = this.generateNameParts(gender);
        const fullName = `${ln} ${mn} ${fn}`;
        
        const year = dob.getFullYear();
        
        return {
            last: ln,
            middle: mn,
            first: fn,
            gender: gender,
            day: dob.getDate(),
            month: dob.getMonth() + 1,
            year: year,
            full_name: fullName,
            username: this.generateUsername(fn, ln, year),
            password: this.generatePassword() // Password mạnh
        };
    }
}

module.exports = VietnameseProfileGenerator;