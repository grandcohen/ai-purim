const conversation = document.getElementById('conversation');
let selectedCostume = '';
let isMale = true;
let counterTimes = 0;
const lineBreak = document.createElement('br');
const TIMEOUT = 800;
let isRefImageLoaded = false;
let isUploadedImageLoaded = false;

window.addEventListener('load', event => {
  localStorage.removeItem('userPhoto');
  localStorage.removeItem('selectedCostume');
});

function showImageResults() {
  const messagePreImageLoad = document.createElement('div');
  const messagePreImageDone = document.createElement('div');
  const chatbotResponse = document.createElement('div');
  chatbotResponse.classList.add('message', 'chatbot', 'image-container');
  messagePreImageLoad.classList.add('message');
  messagePreImageDone.classList.add('message');

  if (counterTimes == 1) {
    messagePreImageLoad.textContent = 'אין בעיה, רק רגע בבקשה';
    messagePreImageDone.textContent = 'כמעט וסיימתי. ' +
                                        (isMale?'מוכן?':'מוכנה?');
    conversation.appendChild(messagePreImageLoad);
    conversation.scrollTop = conversation.scrollHeight;

  } else if (counterTimes < textPostImageResultMale.length) {
    messagePreImageLoad.textContent = 'סבבה עובדת על זה';
    messagePreImageDone.textContent = 'יא אללה ' +
                                        (isMale?'קבל ':'מה ') +
                                        'הכנתי לך';
    conversation.appendChild(messagePreImageLoad);
    conversation.scrollTop = conversation.scrollHeight;

  } else {
    messagePreImageDone.textContent = 'הנה ' +
                                      (isMale?'קח':'קחי');
  }

  setTimeout(function () {

    conversation.appendChild(messagePreImageDone);
    conversation.scrollTop = conversation.scrollHeight;

    setTimeout(function () {
      // create div for when pic didnt finish to upload

      isRefImageLoaded = false;
      isUploadedImageLoaded = false;

      const messageWhileLoading = document.createElement('div');
      messageWhileLoading.classList.add('loader');
      messageWhileLoading.textContent = 'התמונה בטעינה...';
      chatbotResponse.appendChild(messageWhileLoading);
      conversation.appendChild(chatbotResponse);
      conversation.scrollTop = conversation.scrollHeight;

      console.log('1');
      // uploaded
      const imgElement = document.createElement('img');
      imgElement.classList.add('user-image-' + selectedCostume);
      imgElement.src = localStorage.getItem('userPhoto');

      // our image
      const refElement = document.createElement('img');
      refElement.classList.add('reference-image');
      refElement.src = 'img/' + selectedCostume + '.jpg';

      refElement.onload  = () => {
        console.log('2 refElement true')
        isRefImageLoaded = true;
        showReallyTheResults(refElement,imgElement,messageWhileLoading,chatbotResponse);
      }

      imgElement.onload  = () => {
        console.log('2 imgElement true')
        isUploadedImageLoaded = true;
        showReallyTheResults(refElement,imgElement,messageWhileLoading,chatbotResponse);
      }

    }, TIMEOUT+TIMEOUT);
  }, TIMEOUT);
}

function showReallyTheResults(refImage, uploadedImage, messageWhileLoading, chatbotResponse) {
  // Add a timeout to prevent infinite waiting
  const loadingTimeout = setTimeout(() => {
    if (!isRefImageLoaded || !isUploadedImageLoaded) {
      chatbotResponse.removeChild(messageWhileLoading);
      const errorMsg = document.createElement('div');
      errorMsg.textContent = 'טעינת התמונה נכשלה. נא לנסות שנית.';
      errorMsg.classList.add('error-message');
      chatbotResponse.appendChild(errorMsg);
      
      // Add a retry button
      const retryButton = document.createElement('button');
      retryButton.textContent = 'ניסיון נוסף';
      retryButton.addEventListener('click', () => {
        conversation.removeChild(chatbotResponse);
        showCostumeOptions();
      });
      chatbotResponse.appendChild(retryButton);
    }
  }, 10000); // 10 second timeout
  
  if (isRefImageLoaded && isUploadedImageLoaded) {
    clearTimeout(loadingTimeout);
    chatbotResponse.appendChild(refImage);
    chatbotResponse.appendChild(uploadedImage);
    chatbotResponse.removeChild(messageWhileLoading);
    conversation.scrollTop = conversation.scrollHeight;
    setTimeout(function() {
      showCostumeOptions();
    }, TIMEOUT);
  }
}

function showCostumeOptions() {
  const messageOkUpload = document.createElement('div');
  const messageBeforeCotumes = document.createElement('div');
  messageBeforeCotumes.classList.add('message', 'chatbot');
  messageOkUpload.classList.add('message', 'chatbot');

  if (isMale) {
    messageOkUpload.textContent = textPostImageResultMale[counterTimes];
  } else {
    messageOkUpload.textContent = textPostImageResultFemale[counterTimes];
  }

  console.log('counter before: '+counterTimes)

  setTimeout( function () {
    if (counterTimes==0) {
      messageBeforeCotumes.textContent =
        'ועכשיו לחלק האומנותי. למה '
        + (isMale ? 'אתה' : 'את') +
        ' רוצה להתחפש?';
      counterTimes++;
      conversation.appendChild(messageOkUpload);
      conversation.scrollTop = conversation.scrollHeight;

    } else {
      if (counterTimes<textPostImageResultMale.length) {
        counterTimes++;
        conversation.appendChild(messageOkUpload);
        conversation.scrollTop = conversation.scrollHeight;

      }
      messageBeforeCotumes.textContent =
        'מה '
        + (isMale ? 'אתה' : 'את') +
        ' רוצה שוב?';
    }
    console.log('counter after: '+counterTimes)

    setTimeout(function () {
      conversation.appendChild(messageBeforeCotumes);
      conversation.scrollTop = conversation.scrollHeight;

      const messageCotumesButtons = document.createElement('div');
      messageCotumesButtons.classList.add('message', 'chatbot', 'button-message');

      ////////////////////////// ADD LISTENERS //////////////////////////

      const chatLine1 = document.createElement('div');
      const chatLine2 = document.createElement('div');
      const chatLine3 = document.createElement('div');
      chatLine1.classList.add('line');
      chatLine2.classList.add('line');

      // HP
      const hpButton = document.createElement('button');
      hpButton.textContent = 'הארי פוטר';
      hpButton.classList.add('line');
      hpButton.addEventListener('click', listenerHP);
      //chatLine2.appendChild(hpButton);
      messageCotumesButtons.appendChild(hpButton);

      // Cowboy
      const cowboyButton = document.createElement('button');
      cowboyButton.textContent = isMale ? 'קאובוי' : 'קאוגירל';
      cowboyButton.classList.add('line');
      cowboyButton.addEventListener('click', listenerCowboy);
      //chatLine1.appendChild(cowboyButton);
      messageCotumesButtons.appendChild(cowboyButton);

      // Witch
      const witchButton = document.createElement('button');
      witchButton.textContent = isMale ? 'מכשף' : 'מכשפה';
      witchButton.addEventListener('click', listenerWitch);
      //chatLine3.appendChild(witchButton);
      messageCotumesButtons.appendChild(witchButton);

      // Wonder
      const wonderButton = document.createElement('button');
      wonderButton.textContent = 'וונדר וומן';
      wonderButton.addEventListener('click', listenerWonder);
      //chatLine3.appendChild(wonderButton);
      messageCotumesButtons.appendChild(wonderButton);

      // Fairy
      const fairyButton = document.createElement('button');
      fairyButton.textContent = 'פייה';
      fairyButton.classList.add('line');
      fairyButton.addEventListener('click', listenerFairy);
      //chatLine1.appendChild(fairyButton);
      messageCotumesButtons.appendChild(fairyButton);

      // Madhat
      const madhatButton = document.createElement('button');
      madhatButton.textContent = 'הכובען המטורף';
      madhatButton.classList.add('line');
      madhatButton.addEventListener('click', listenerMadhat);
      //chatLine2.appendChild(madhatButton);
      messageCotumesButtons.appendChild(madhatButton);

      // Pirate
      const pirateButton = document.createElement('button');
      pirateButton.textContent = isMale ? 'פיראט' : 'פיראטית';
      //pirateButton.classList.add('line');
      pirateButton.addEventListener('click', listenerPirate);
      //chatLine2.appendChild(pirateButton);
      messageCotumesButtons.appendChild(pirateButton);

      // Batman
      const batmanButton = document.createElement('button');
      batmanButton.textContent = 'בטמן';
      batmanButton.addEventListener('click', listenerBatman);
      //chatLine1.appendChild(batmanButton);
      messageCotumesButtons.appendChild(batmanButton);

      conversation.appendChild(messageCotumesButtons);
      conversation.scrollTop = conversation.scrollHeight;

      ////////////////////////// LISTEN FUNCTIONS //////////////////////////

      async function listenerBatman() {
        selectedCostume = 'batman';
        batmanButton.classList.add('clicked')
        removeListnersForCostumes();
        await showImageResults();
      };

      async function listenerCowboy() {
        cowboyButton.classList.add('clicked')
        selectedCostume = 'cowboy';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerFairy() {
        fairyButton.classList.add('clicked')
        selectedCostume = 'fairy';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerHP() {
        hpButton.classList.add('clicked')
        selectedCostume = 'hp';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerMadhat() {
        madhatButton.classList.add('clicked')
        selectedCostume = 'madhat';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerPirate() {
        pirateButton.classList.add('clicked')
        selectedCostume = 'pirate';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerWitch() {
        witchButton.classList.add('clicked')
        selectedCostume = 'witch';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerWonder() {
        wonderButton.classList.add('clicked')
        selectedCostume = 'wonder';
        removeListnersForCostumes();
        await showImageResults();
      }

      function removeListnersForCostumes() {
        batmanButton.removeEventListener('click', listenerBatman);
        cowboyButton.removeEventListener('click', listenerCowboy);
        //doctorButton.removeEventListener('click', listenerDoctor);
        fairyButton.removeEventListener('click', listenerFairy);
        hpButton.removeEventListener('click', listenerHP);
        madhatButton.removeEventListener('click', listenerMadhat);
        pirateButton.removeEventListener('click', listenerPirate);
        //spidermanButton.removeEventListener('click', listenerSpiderman);
        witchButton.removeEventListener('click', listenerWitch);
        wonderButton.removeEventListener('click', listenerWonder);
      }
    }, TIMEOUT);
  }, TIMEOUT); // Beginning

}

function showUploadButton() {
  // Create pre-upload message
  const messageUploadImage = document.createElement('div');
  messageUploadImage.classList.add('message', 'chatbot');
  const messageUploadP1 = document.createElement('p');
  const messageUploadP2 = document.createElement('p');
  const messageUploadP3 = document.createElement('p');
  messageUploadP1.textContent = 'כדי שאוכל להלביש אותך בתחפושת, ראשית '+
                                  (isMale?'אתה צריך':'את צריכה')+
                                 ' לעלות תמונת פרופיל.';
  ;
  messageUploadP2.textContent = 'לתוצאות הטובות ביותר, אני ממליצה לצלם תמונת פנים בלבד כאשר הן פונות ישר למצלמה.';
  messageUploadP3.textContent = 'ואל דאגה, אני לא שומרת את התמונות שלך.';
  messageUploadImage.appendChild(messageUploadP1);
  messageUploadImage.appendChild(messageUploadP2)
  messageUploadImage.appendChild(messageUploadP3);
  conversation.appendChild(messageUploadImage);
  conversation.scrollTop = conversation.scrollHeight;

  // Create button message
  const messageUploadButton = document.createElement('div');
  messageUploadButton.classList.add('message', 'chatbot','button-message');
  const uploadButton = document.createElement('button');
  uploadButton.textContent = 'העלאת תמונה';
  uploadButton.addEventListener('click', function handleFileUpload() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', handleFileSelect);
      fileInput.click();

      function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
          // Show loading indicator
          const loadingMessage = document.createElement('div');
          loadingMessage.classList.add('message', 'chatbot');
          loadingMessage.textContent = 'התמונה בטעינה...';
          conversation.appendChild(loadingMessage);
          conversation.scrollTop = conversation.scrollHeight;
          
          // Compress and resize image before storing
          compressImage(file, function(dataUrl) {
            localStorage.setItem('userPhoto', dataUrl);
            // Remove loading indicator
            conversation.removeChild(loadingMessage);
            uploadButton.removeEventListener('click', handleFileUpload);
            setTimeout(function() {
              showCostumeOptions();
            }, TIMEOUT);
          });
        } else {
          // Show error message if file isn't an image
          const errorMessage = document.createElement('div');
          errorMessage.classList.add('message', 'chatbot');
          errorMessage.textContent = 'אופס קרתה תקלה. נא לוודא שהקובץ הוא תמונה ולנסות שוב.';
          conversation.appendChild(errorMessage);
          conversation.scrollTop = conversation.scrollHeight;
        }
      }
    console.log('end of showUploadButton');
});

  messageUploadButton.appendChild(uploadButton);
  conversation.appendChild(messageUploadButton);
  conversation.scrollTop = conversation.scrollHeight;
}


function showGender() {
  const messageBeforeGender = document.createElement('div');
  messageBeforeGender.classList.add('message', 'chatbot');
  messageBeforeGender.textContent = 'לפני שנתחיל, באיזו לשון פנייה להשתמש כשאני מדברת איתך?';
  conversation.appendChild(messageBeforeGender);
  conversation.scrollTop = conversation.scrollHeight;

  const messageGender = document.createElement('div');
  messageGender.classList.add('message', 'chatbot','button-message');

  ////////////////////////// ADD LISTENERS //////////////////////////

  // Male
  const maleButton = document.createElement('button');
  maleButton.textContent = 'זכר';
  maleButton.addEventListener('click', listenerMale);
  messageGender.appendChild(maleButton);
  conversation.appendChild(messageGender);
  conversation.scrollTop = conversation.scrollHeight;

  // Female
  const femaleButton = document.createElement('button');
  femaleButton.textContent = 'נקבה';
  femaleButton.addEventListener('click', listenerFemale);
  messageGender.appendChild(femaleButton);
  conversation.appendChild(messageGender);
  conversation.scrollTop = conversation.scrollHeight;


  // Message gender result
  const messageGenderResult = document.createElement('div');
  messageGenderResult.classList.add('message', 'chatbot');

  async function listenerMale() {
    maleButton.classList.add('clicked')
    setTimeout(function() {
      messageGenderResult.textContent = 'אין בעיה, אפנה אליך בלשון זכר';
      conversation.appendChild(messageGenderResult);
      conversation.scrollTop = conversation.scrollHeight;
      isMale = true;
      removeListnersForGender();
      setTimeout( function (){
         showUploadButton();
      }, TIMEOUT);
    }, TIMEOUT);
  }

  async function listenerFemale() {
    femaleButton.classList.add('clicked')
    setTimeout(function() {
      messageGenderResult.textContent = 'אין בעיה, אפנה אלייך בלשון נקבה';
      conversation.appendChild(messageGenderResult);
      conversation.scrollTop = conversation.scrollHeight;
      isMale = false;
      removeListnersForGender();
      setTimeout(  function () {
        showUploadButton();
      }, TIMEOUT);
    }, TIMEOUT);
  }

  function removeListnersForGender() {
    maleButton.removeEventListener('click', listenerMale);
    femaleButton.removeEventListener('click', listenerFemale);
  }
}

function initPage() {
    const messageHello = document.createElement('div');
    messageHello.classList.add('message', 'chatbot');
    messageHello.textContent = 'שלום לך';
    conversation.appendChild(messageHello);
    conversation.scrollTop = conversation.scrollHeight;

  setTimeout(function() {

    const messageWhoAmI = document.createElement('div');
    messageWhoAmI.classList.add('message', 'chatbot');
    const messageWhoAmI1 = document.createElement('p');
    const messageWhoAmI2 = document.createElement('p');
    messageWhoAmI1.textContent = 'אני AI PuRIM';
    messageWhoAmI2.textContent = 'הבינה המלאכותית שתלביש אותך בשלל תחפושות לפורים';
    messageWhoAmI.appendChild(messageWhoAmI1);
    messageWhoAmI.appendChild(messageWhoAmI2);
    conversation.appendChild(messageWhoAmI);
    conversation.scrollTop = conversation.scrollHeight;

    setTimeout(function () {

      const messageHowDoes = document.createElement('div');
      messageHowDoes.classList.add('message', 'chatbot');
      const messageHowDoes1 = document.createElement('p');
      const messageHowDoes2 = document.createElement('p');
      messageHowDoes1.textContent = 'איך אני עובדת?'
      messageHowDoes2.textContent = 'אני לוקחת את תמונת הפנים שלך ותמונה של תחפושת לפורים ומעבדת אותן יחדיו לכדי יצירה אחת'
      messageHowDoes.appendChild(messageHowDoes1);
      messageHowDoes.appendChild(messageHowDoes2);
      conversation.appendChild(messageHowDoes);
      conversation.scrollTop = conversation.scrollHeight;

      setTimeout(  function () {
        showGender();
      }, TIMEOUT);
    }, TIMEOUT);
  }, TIMEOUT);
}

// Add this new function to compress images
function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // Create canvas to resize image
      const canvas = document.createElement('canvas');
      // Determine size - limit to max 800px width/height
      let width = img.width;
      let height = img.height;
      const maxSize = 800;
      
      if (width > height && width > maxSize) {
        height = (height / width) * maxSize;
        width = maxSize;
      } else if (height > maxSize) {
        width = (width / height) * maxSize;
        height = maxSize;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress image
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get reduced-size data URL (0.8 quality)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      callback(dataUrl);
    };
    
    img.onerror = function() {
      alert('אירעה שגיאה בטעינת התמונה. נא לנסות שוב.');
    };
    
    img.src = event.target.result;
  };
  
  reader.onerror = function() {
    alert('אירעה שגיאה בקריאת הקובץ. נא לנסות שוב.');
  };
  
  reader.readAsDataURL(file);
}

function handleFileUpload() {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  // Add capture attribute for better mobile camera handling
  fileInput.setAttribute('capture', 'user');
  fileInput.addEventListener('change', handleFileSelect);
  fileInput.click();
}


// Code starts here
initPage();

const textPostImageResultFemale = ['מצויין, התמונה עלתה',
  'חחחחח אהבת?? באמת חשבת אני עכשיו אתחיל לעבד תמונות בשבילך? כאילו אין לי משהו יותר טוב לעשות. היית צריכה לראות את המבט שלך בעיניים. וואי אני פיפי',
  'נו מה את אומרת? פתאום זה קטע הא?', 'העיקר בהתחלה צחקת עליי והנה תראי אותך',
  'חחחח מישהי פה התמכרה',
  'נשמההה מישהי פה נהיית אחות בלב',
  'טוב מאמי אין לי באמת את כל היום, עוד אנשים רוצים לדבר איתי',
  'שמעי אני זזה, שמה את עצמי על בינה אוטומטית. את יכולה להמשיך ללחוץ אבל אני לא פה. ביי חיים.'];

const textPostImageResultMale = ['מצויין, התמונה עלתה',
  'חחחחח אהבת?? באמת חשבת אני עכשיו אתחיל לעבד תמונות בשבילך? כאילו אין לי משהו יותר טוב לעשות. היית צריך לראות את המבט שלך בעיניים. וואי אני פיפי',
  'נו מה אתה אומר? איך יצא הפעם? אהבת?', 'העיקר בהתחלה צחקת עליי והנה תראה אותך.',
  'חחחח מישהו פה התמכר',
  'אתה לא יכול בלעדיי הא?',
  'מאמי אתה קצת מגזים. אין לך בינות אחרות לדבר איתן?',
  'טוב חלאס. אני שמה את עצמי על בינה אוטומטית. מבחינתי תלחץ, תעשה מה בא לך אני עפתי. סלמתק.'];
