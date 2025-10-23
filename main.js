document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("infoForm");
  const profileName = document.getElementById("profileName");
  const AgenGender = document.getElementById("AgenGender");
  const profileUniv = document.getElementById("profileUniv");
  const profileHobbies = document.getElementById("profileHobbies");
  const profileAvatar = document.getElementById("profileAvatar");
  const profileContent = document.getElementById("profileContent");

  if (!form) return;

  let avatarBlobUrl = null;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value || "";
    const age = document.getElementById("age").value || "";
    const genderRadio = document.querySelector('input[name="gender"]:checked');
    const gender = genderRadio ? genderRadio.value : "";
    const university = document.getElementById("university").value || "";

    const hobbies = Array.from(
      document.querySelectorAll('input[name="hobby"]:checked')
    ).map((el) => el.value);

    const fileInput = document.getElementById("avatar");
    const file = fileInput && fileInput.files && fileInput.files[0];

    // kiem tra 
    if (name.trim() === "") {
      alert("Họ tên không được để trống");
      return;
    }

    const ageNumber = Number(age);
    if (age.trim() === "" || Number.isNaN(ageNumber) || ageNumber <= 0) {
      alert("Tuổi phải là số nguyên dương hợp lệ");
      return;
    }

    if (gender === "") {
      alert("Vui lòng chọn giới tính");
      return;
    }

    if (university === "") {
      alert("Vui lòng chọn trường đại học");
      return;
    }

    profileName.textContent = name;
    AgenGender.textContent = `${ageNumber} tuổi • ${gender || "—"}`;
    profileUniv.textContent = university || "—";

    profileHobbies.innerHTML = "";
    if (hobbies.length) {
      hobbies.forEach((h) => {
        const span = document.createElement("span");
        span.className = "chip";
        span.textContent = h + ",";
        profileHobbies.appendChild(span);
      });
    } else {
      const span = document.createElement("span");
      span.className = "AgenGender";
      span.textContent = "—";
      profileHobbies.appendChild(span);
    }

    if (file && file.type && file.type.startsWith("image/")) {
      if (avatarBlobUrl) URL.revokeObjectURL(avatarBlobUrl);
      avatarBlobUrl = URL.createObjectURL(file);
      profileAvatar.src = avatarBlobUrl;
      profileAvatar.alt = name;
    } else {
      profileAvatar.src = "";
      profileAvatar.alt = "Avatar";
    }

    
    if (profileContent) profileContent.style.display = "block";
  });
});
