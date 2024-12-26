//명함 다운로드
    document.addEventListener("DOMContentLoaded", () => {
      const buttons = document.querySelectorAll(".btn-wrap .btn");
      const images = document.querySelectorAll(".flex2 img");
      const custInputTxtInputs = document.querySelectorAll(".cust-input-txt input");
      const custSubInputs = document.querySelectorAll(".cust-sub input");
      const downloadBtn = document.getElementById("downloadBtn");
  
      let currentImageIndex = 0;
      let currentColors = { 
        korNameColor: "#000", 
        companyColor: "#000", 
        teamColor: "#000", 
        subColor: "#fff" 
      }; // 초기 색상 설정
  
      // 이미지 표시 함수
      function showImage(index) {
        images.forEach((img) => {
          img.style.display = "none";
        });
        if (images[index]) {
          images[index].style.display = "block";
          currentImageIndex = index;
        }
      }
  
      // 텍스트 색상 변경 함수
      function changeColors(korNameColor, companyColor, teamColor, subColor) {
        custInputTxtInputs.forEach(input => {
          if (input.classList.contains("kor-name")) {
            input.style.color = korNameColor;
          } else if (input.classList.contains("company")) {
            input.style.color = companyColor;
          } else if (input.classList.contains("team")) {
            input.style.color = teamColor;
          }
        });
        custSubInputs.forEach(input => (input.style.color = subColor));
        currentColors = { korNameColor, companyColor, teamColor, subColor }; // 현재 색상 저장
      }
  
      // 버튼 클릭 이벤트 추가
      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          showImage(index);
          if (index === 0) {
            changeColors("#000", "#000", "#000", "#fff");
          } else if (index === 1) {
            changeColors("#fff", "#fff", "#fff", "#fff");
          } else if (index === 2) {
            changeColors("#fff", "#fff", "#fff", "#433189");
          } else if (index === 3) {
            changeColors("#fff", "#fff", "#fff", "#fff");
          }
        });
      });
  
      // 다운로드 버튼 이벤트
      downloadBtn.addEventListener("click", () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const currentImage = images[currentImageIndex];
        const targetWidth = 600;
        const aspectRatio = currentImage.naturalHeight / currentImage.naturalWidth;
        const targetHeight = targetWidth * aspectRatio;
  
        // 캔버스 크기 설정
        canvas.width = targetWidth;
        canvas.height = targetHeight;
  
        // 현재 이미지 캔버스에 그리기
        ctx.drawImage(currentImage, 0, 0, targetWidth, targetHeight);
  
        // 텍스트 추가
        const padding = 60;
        const bottomMargin = 70;
        const telGap = 160;
        const korNameLetterSpacing = 20; // `kor-name`의 letter-spacing 값 (픽셀 단위)
        let currentY = targetHeight - bottomMargin;
  
        Array.from(custInputTxtInputs).reverse().forEach((input) => {
          if (input.value.trim() !== "") {
            const isKorName = input.classList.contains("kor-name");
            const isCompany = input.classList.contains("company");
            const isTeam = input.classList.contains("team");
            const isTel = input.classList.contains("tel");
            const fontSize = isKorName ? 70 : 30;
            const lineGap = isKorName ? 40 : 20;
  
            ctx.font = `${fontSize}px ${window.getComputedStyle(input).fontFamily}`;
            ctx.fillStyle = isKorName
              ? currentColors.korNameColor
              : isCompany
              ? currentColors.companyColor
              : isTeam
              ? currentColors.teamColor
              : currentColors.subColor; // 클래스에 따른 색상 적용
            ctx.textBaseline = "bottom";
  
            if (isKorName) {
              // `kor-name` 텍스트를 하나씩 그리면서 letter-spacing 적용
              const chars = input.value.split("");
              let x = padding;
              chars.forEach((char) => {
                ctx.fillText(char, x, currentY);
                x += ctx.measureText(char).width + korNameLetterSpacing;
              });
            } else {
              ctx.fillText(input.value, padding, currentY);
            }
  
            if (isTel) {
              currentY -= telGap;
            } else {
              currentY -= fontSize + lineGap;
            }
          }
        });
  
        // 캔버스를 이미지로 변환하여 다운로드
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "custom_card.png";
        link.click();
      });
  
      // 초기 설정
      showImage(0);
      changeColors("#000", "#000", "#000", "#fff");
    });
