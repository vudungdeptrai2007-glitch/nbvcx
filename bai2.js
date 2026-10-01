let choice;

let registeredMembers = 0;
let totalRevenue = 0;
let checkInCount = 0;

let memberName = "";
let memberCard = "";
let selectedPackage = "";
let months = 0;
let hasPT = false;

const STANDARD_PRICE = 500000;
const VIP_PRICE = 800000;
const PT_PRICE = 300000;

do {
    console.log(`
================ GYM FITNESS ================
1. Đăng ký hội viên mới
2. Tính tiền gói tập
3. Quét mã thẻ check-in
4. Báo cáo ca trực và thoát
===============================================
`);

    choice = prompt("Nhập lựa chọn:");

    switch (choice) {
        case "1":
            memberName = prompt("Nhập họ tên hội viên:");
            memberName = memberName.trim().toUpperCase();

            memberCard = prompt("Nhập mã thẻ hội viên:");
            memberCard = memberCard.trim().toUpperCase();

            if (memberName === "" || memberCard === "") {
                console.log("Thông tin hội viên không được để trống!");
                break;
            }

            registeredMembers++;

            console.log(`
ĐĂNG KÝ THÀNH CÔNG
Họ tên     : ${memberName}
Mã thẻ     : ${memberCard}
Số hội viên: ${registeredMembers}
`);
            break;

        case "2":
            if (registeredMembers === 0) {
                console.log("Chưa có hội viên. Vui lòng đăng ký hội viên trước!");
                break;
            }

            selectedPackage = prompt("Nhập gói tập (STANDARD/VIP):");
            selectedPackage = selectedPackage.trim().toUpperCase();

            if (selectedPackage !== "STANDARD" && selectedPackage !== "VIP") {
                console.log("Gói tập không hợp lệ!");
                break;
            }

            months = Number(prompt("Nhập số tháng đăng ký:"));

            if (isNaN(months) || months <= 0) {
                console.log("Số tháng không hợp lệ!");
                break;
            }

            let packagePrice;

            if (selectedPackage === "STANDARD") {
                packagePrice = STANDARD_PRICE;
            } else {
                packagePrice = VIP_PRICE;
            }

            hasPT = prompt("Có thuê PT không? (Y/N)");
            hasPT = hasPT.trim().toUpperCase();

            let ptSessions = 0;

            if (hasPT === "Y") {
                ptSessions = Number(prompt("Nhập số buổi PT:"));

                if (isNaN(ptSessions) || ptSessions < 0) {
                    console.log("Số buổi PT không hợp lệ!");
                    break;
                }
            }

            const packageTotal = packagePrice * months;
            const ptTotal = ptSessions * PT_PRICE;
            const subtotal = packageTotal + ptTotal;

            let discountRate = 0;

            if (months >= 12) {
                discountRate = 0.25;
            } else if (months >= 6) {
                discountRate = 0.15;
            }

            const discount = subtotal * discountRate;
            const finalTotal = subtotal - discount;

            totalRevenue += finalTotal;

            const line = "-".repeat(45);

            console.log(`
${line}
              HÓA ĐƠN GYM FITNESS
${line}
Hội viên       : ${memberName}
Mã thẻ         : ${memberCard}
Gói tập        : ${selectedPackage}
Số tháng       : ${months}
Tiền gói tập   : ${packageTotal.toLocaleString("vi-VN")} VNĐ
Số buổi PT     : ${ptSessions}
Tiền PT        : ${ptTotal.toLocaleString("vi-VN")} VNĐ
${line}
Tạm tính       : ${subtotal.toLocaleString("vi-VN")} VNĐ
Giảm giá       : ${(discountRate * 100)}%
Tiền giảm      : ${discount.toLocaleString("vi-VN")} VNĐ
THANH TOÁN     : ${finalTotal.toLocaleString("vi-VN")} VNĐ
${line}
`);

            break;

        case "3":
            let checkInCode = prompt("Quét/nhập mã thẻ check-in:");
            checkInCode = checkInCode.trim().toUpperCase();

            const currentYear = new Date().getFullYear();

            const hasGymPrefix = checkInCode.startsWith("GYM-");
            const hasCurrentYear = checkInCode.endsWith(String(currentYear));

            if (hasGymPrefix && hasCurrentYear) {
                checkInCount++;

                console.log(`
CHECK-IN THÀNH CÔNG
Mã thẻ: ${checkInCode}
Số lượt check-in: ${checkInCount}
`);
            } else {
                console.log("Mã thẻ không hợp lệ!");
                console.log(`Mã phải bắt đầu bằng GYM- và kết thúc bằng ${currentYear}.`);
            }

            break;

        case "4":
            const lineReport = "=".repeat(45);

            console.log(`
${lineReport}
          BÁO CÁO TỔNG KẾT CA TRỰC
${lineReport}
Số hội viên đăng ký : ${registeredMembers}
Số lượt check-in    : ${checkInCount}
Tổng doanh thu      : ${totalRevenue.toLocaleString("vi-VN")} VNĐ
${lineReport}
          KẾT THÚC CA LÀM VIỆC
${lineReport}
`);

            break;

        default:
            console.log("Lựa chọn không hợp lệ! Vui lòng chọn từ 1 đến 4.");
            break;
    }

} while (choice !== "4");