const downloadButton = document.querySelector('.downloadBtn');
  downloadButton.addEventListener('click', () => {
    const frontDiv = document.querySelector('.cust-card > div:nth-child(1)');
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    const cardWidth = 468; // Fixed width for the card
    const cardHeight = 752; // Fixed height for the card
    canvas.width = cardWidth; // Single card width
    canvas.height = cardHeight;
  
    const frontImage = frontDiv.querySelector('img'); // card_f 이미지
  
    const frontImageElement = new Image();
    frontImageElement.src = frontImage.src;
  
    frontImageElement.onload = () => {
      ctx.drawImage(frontImageElement, 0, 0, cardWidth, cardHeight);
  
      const korName = document.querySelector('#nameInut').value;
      const engName = document.querySelector('#engName').value;
      const team = document.querySelector('#engName.team').value;
      const company = document.querySelector('.company').value;
      const tel = document.querySelector('.tel').value;
      const email = document.querySelector('.email').value;
  
      function drawTextWithLetterSpacing(ctx, text, x, y, letterSpacing) {
        const characters = text.split('');
        const textWidth = characters.reduce((acc, char) => acc + ctx.measureText(char).width + letterSpacing, -letterSpacing);
        let currentPosition = x - (textWidth / 2);
  
        characters.forEach(char => {
          ctx.fillText(char, currentPosition, y);
          currentPosition += ctx.measureText(char).width + letterSpacing;
        });
      }
  
      ctx.font = "30px 'KMA-Regular'";
      ctx.fillStyle = "#000";
      ctx.textAlign = 'center';
  
      drawTextWithLetterSpacing(ctx, korName, cardWidth / 1.89, canvas.height - 400, 10);
  
      ctx.font = "16px 'KMA-Light'";
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillText(engName, cardWidth / 2, canvas.height - 360);
      ctx.font = "16px 'SUIT-variable'";
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      drawTextWithLetterSpacing(ctx, team, cardWidth / 1.965, canvas.height - 280, -1);
  
      // Draw additional details (company, tel, email)
      ctx.font = "300 18px 'SUIT-variable'";
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillText(company, cardWidth / 2, canvas.height - 150);
      ctx.fillText(tel, cardWidth / 2, canvas.height - 110);
      ctx.fillText(email, cardWidth / 2, canvas.height - 70);
  
      // Save the canvas as an image
      const link = document.createElement('a');
      link.download = 'business_card.png';
      link.href = canvas.toDataURL();
      link.click();
    };
  });