document.addEventListener("DOMContentLoaded", function() {
    const database = firebase.database();
    const companyRef = database.ref('static/company');

    companyRef.once('value', snapshot => {
        console.log('Data snapshot received:', snapshot.val()); // Log the snapshot data
        const userDropdown = document.getElementById("company-id");
        snapshot.forEach(child => {
            const company = child.val();
            const option = document.createElement("option");
            console.log('Company:', company.name);
            option.value = company.key;
            option.textContent = company.name;
            userDropdown.appendChild(option);
        });
    });
});
