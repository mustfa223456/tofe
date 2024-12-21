const cart = [];

function addToCart(item, price) {
    const cartItems = document.getElementById("cart-items");
    const li = document.createElement("li");
    li.textContent = `${item} - ${price} دينار`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "حذف";
    removeButton.onclick = () => removeFromCart(li, price);

    li.appendChild(removeButton);
    cartItems.appendChild(li);
    updateTotalPrice();
}

function removeFromCart(item, price) {
    item.remove();
    updateTotalPrice();
}

function updateTotalPrice() {
    const cartItems = document.getElementById("cart-items").children;
    let total = 0;
    Array.from(cartItems).forEach(item => {
        const price = parseFloat(item.textContent.replace(" دينار", "").split("-")[1].trim());
        total += price;
    });
    document.getElementById("total-price").textContent = `إجمالي السعر: ${total} دينار`;
}

function proceedToTelegram() {
    const telegramUrl = "https://t.me/tofe_00_iq"; // رابط الموقع
    const cartSummary = Array.from(document.getElementById("cart-items").children)
        .map(li => li.textContent.replace('حذف', ''))
        .join("\n");
    const message = encodeURIComponent(`تفاصيل الطلب:\n${cartSummary}`);
    window.open(`${telegramUrl}?text=${message}`, "_blank");
}

function trackOrder() {
    const trackingId = document.getElementById("tracking-id").value;
    const trackingResult = document.getElementById("tracking-result");

    if (trackingId === "12345") {
        trackingResult.textContent = "تم شحن الطلب بنجاح!";
        trackingResult.style.color = "#00ff99";
    } else {
        trackingResult.textContent = "معرف الطلب غير صحيح أو لم يتم الشحن بعد.";
        trackingResult.style.color = "red";
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("التحقق من الموقع غير مدعوم في متصفحك.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    alert(`موقعك الحالي: ${lat}, ${lon}`);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("تم رفض الوصول إلى الموقع.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("الموقع غير متاح.");
            break;
        case error.TIMEOUT:
            alert("انتهت مهلة طلب الموقع.");
            break;
        case error.UNKNOWN_ERROR:
            alert("خطأ غير معروف.");
            break;
    }
}
