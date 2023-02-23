const conversation = document.getElementById('conversation');
let selectedCostume = '';
let isMale = true;
let isFirstTime = true;
const lineBreak = document.createElement('br');
const TIMEOUT = 800;

// CROP
//const imageCropperOverlay = document.getElementById('image-cropper-overlay');
//const imageToCrop = document.getElementById('image-to-crop');

window.addEventListener('load', event => {
  localStorage.removeItem('userPhoto');
  localStorage.removeItem('selectedCostume');
});

function showImageResults() {
  const messagePreImageLoad = document.createElement('div');
  const messagePreImageDone = document.createElement('div');
  const chatbotResponse = document.createElement('div');
  messagePreImageLoad.classList.add('message');
  messagePreImageLoad.textContent = 'אין בעיה, רק רגע';
  messagePreImageDone.classList.add('message')
  messagePreImageDone.textContent = 'הנה זה מוכן';
  chatbotResponse.classList.add('message', 'chatbot', 'image-container');

  conversation.appendChild(messagePreImageLoad);

  setTimeout(function () {

    conversation.appendChild(messagePreImageDone);
    setTimeout(function () {
      // uploaded
      const imgElement = document.createElement('img');
      imgElement.classList.add('user-image-' + selectedCostume);
      imgElement.src = localStorage.getItem('userPhoto');
      chatbotResponse.appendChild(imgElement);
      // our image
      const refElement = document.createElement('img');
      refElement.src = 'img/' + selectedCostume + '.jpg';
      refElement.classList.add('reference-image');
      chatbotResponse.appendChild(refElement);

      conversation.appendChild(chatbotResponse);
      conversation.scrollTop = conversation.scrollHeight;

      setTimeout(function () {
        showCostumeOptions();
      }, TIMEOUT);
    }, TIMEOUT);
  }, TIMEOUT+TIMEOUT);
}

function showCostumeOptions() {
  const messageOkUpload = document.createElement('div');
  const messageBeforeCotumes = document.createElement('div');
  messageBeforeCotumes.classList.add('message', 'chatbot');
  messageOkUpload.classList.add('message', 'chatbot');

  setTimeout( function () {
    if (isFirstTime) {
      messageOkUpload.textContent = 'מצויין, התמונה עלתה';
      messageBeforeCotumes.textContent =
        'ועכשיו לחלק האומנותי. למה '
        + (isMale ? 'אתה' : 'את') +
        ' רוצה להתחפש?';
      isFirstTime = false;
      conversation.appendChild(messageOkUpload);
    } else {
      messageBeforeCotumes.textContent = 'אהבת הא? אין אני מלך. יאללה עוד פעם?';
    }

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

      messageCotumesButtons.appendChild(chatLine1);
      messageCotumesButtons.appendChild(chatLine2);
      messageCotumesButtons.appendChild(chatLine3);

      // Batman
      const batmanButton = document.createElement('button');
      batmanButton.textContent = 'בטמן';
      batmanButton.addEventListener('click', listenerBatman);
      chatLine1.appendChild(batmanButton);

      // Cowboy
      const cowboyButton = document.createElement('button');
      cowboyButton.textContent = isMale ? 'קאובוי' : 'קאוגירל';
      cowboyButton.addEventListener('click', listenerCowboy);
      chatLine1.appendChild(cowboyButton);

      // Doctor
      const doctorButton = document.createElement('button');
      doctorButton.textContent = isMale ? 'רופא' : 'רופאה';
      doctorButton.addEventListener('click', listenerDoctor);
      chatLine1.appendChild(doctorButton);

      // Fairy
      const fairyButton = document.createElement('button');
      fairyButton.textContent = 'פייה';
      fairyButton.addEventListener('click', listenerFairy);
      chatLine1.appendChild(fairyButton);

      // HP
      const hpButton = document.createElement('button');
      hpButton.textContent = 'הארי פוטר';
      hpButton.addEventListener('click', listenerHP);
      chatLine2.appendChild(hpButton);

      // Madhat
      const madhatButton = document.createElement('button');
      madhatButton.textContent = 'הכובען המטורף';
      madhatButton.addEventListener('click', listenerMadhat);
      chatLine2.appendChild(madhatButton);

      // Pirate
      const pirateButton = document.createElement('button');
      pirateButton.textContent = isMale ? 'פיראט' : 'פיראטית';
      pirateButton.addEventListener('click', listenerPirate);
      chatLine2.appendChild(pirateButton);

      // Spiderman
      const spidermanButton = document.createElement('button');
      spidermanButton.textContent = 'ספיידרמן';
      spidermanButton.addEventListener('click', listenerSpiderman);
      chatLine3.appendChild(spidermanButton);

      // Witch
      const witchButton = document.createElement('button');
      witchButton.textContent = isMale ? 'מכשף' : 'מכשפה';
      witchButton.addEventListener('click', listenerWitch);
      chatLine3.appendChild(witchButton);

      // Wonder
      const wonderButton = document.createElement('button');
      wonderButton.textContent = 'וונדר וומן';
      wonderButton.addEventListener('click', listenerWonder);
      chatLine3.appendChild(wonderButton);


      conversation.appendChild(messageCotumesButtons);
      conversation.scrollTop = conversation.scrollHeight;

      ////////////////////////// LISTEN FUNCTIONS //////////////////////////

      /*async function listenerBatman() {
        selectedCostume = 'batman';
        removeListnersForCostumes();
        setTimeout(function (){
          showImageResults();
        } , TIMEOUT);
      };*/
      async function listenerBatman() {
        selectedCostume = 'batman';
        removeListnersForCostumes();
        await showImageResults();
      };

      async function listenerCowboy() {
        selectedCostume = 'cowboy';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerDoctor() {
        selectedCostume = 'doctor';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerFairy() {
        selectedCostume = 'fairy';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerHP() {
        selectedCostume = 'hp';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerMadhat() {
        selectedCostume = 'madhat';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerPirate() {
        selectedCostume = 'pirate';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerSpiderman() {
        selectedCostume = 'spiderman';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerWitch() {
        selectedCostume = 'witch';
        removeListnersForCostumes();
        await showImageResults();
      }

      async function listenerWonder() {
        selectedCostume = 'wonder';
        removeListnersForCostumes();
        await showImageResults();
      }

      function removeListnersForCostumes() {
        batmanButton.removeEventListener('click', listenerBatman);
        cowboyButton.removeEventListener('click', listenerCowboy);
        doctorButton.removeEventListener('click', listenerDoctor);
        fairyButton.removeEventListener('click', listenerFairy);
        hpButton.removeEventListener('click', listenerHP);
        madhatButton.removeEventListener('click', listenerMadhat);
        pirateButton.removeEventListener('click', listenerPirate);
        spidermanButton.removeEventListener('click', listenerSpiderman);
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
  messageUploadP1.textContent = 'כדי שתוכלו להתלבש בתחפושת, קודם צריך לעלות תמונת פרופיל.';
  messageUploadP2.textContent = 'לתוצאות הטובות ביותר, אנו ממליצים לוודא שהצילום נעשה על רקע לבן, הראש פונה ישר למצלמה ומלבד הראש רואים את הצוואר ומעט מהכתפיים.';
  messageUploadImage.appendChild(messageUploadP1);
  messageUploadImage.appendChild(messageUploadP2);
  conversation.appendChild(messageUploadImage);

  // Create button message
  const messageUploadImage2 = document.createElement('div');
  messageUploadImage2.classList.add('message', 'chatbot','button-message');
  conversation.appendChild(messageUploadImage2);
  const uploadButton = document.createElement('button');
  uploadButton.textContent = 'העלאת תמונה';
  uploadButton.addEventListener('click', function handleFileUpload() {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.addEventListener('change', handleFileSelect);
      fileInput.click();

      function handleFileSelect(event) { // added 'event' parameter to handleFileSelect function
        const file = event.target.files[0];
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.addEventListener('load', event => {
            const dataUrl = event.target.result;
            localStorage.setItem('userPhoto', dataUrl);
            console.log('in handleFileSelect event load');

            // show for the first time
            setTimeout(function (){
              showCostumeOptions();
            }, TIMEOUT);
            /* CROPPER
            imageToCrop.src = localStorage.getItem('userPhoto');
            imageCropperOverlay.style.display = 'block';
            imageToCrop.addEventListener('load', () => {
              const cropperElement = document.createElement('img');
              cropperElement.id = 'uploaded-image';
              cropperElement.src = localStorage.getItem('userPhoto');
              document.getElementById('overlay-body').appendChild(cropperElement);
              cropper = initCropper();
            });
             */

          }, { once: true });
          reader.readAsDataURL(file);
          console.log('end of handleFileSelect');
        }
      }
    console.log('end of showUploadButton');
  uploadButton.removeEventListener('click', handleFileUpload);
});

  messageUploadImage2.appendChild(uploadButton);
  conversation.appendChild(messageUploadImage2);
}


function showGender() {
  const messageBeforeGender = document.createElement('div');
  messageBeforeGender.classList.add('message', 'chatbot');
  messageBeforeGender.textContent = 'לפני שנתחיל, איך לפנות אליך?';
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

  // Female
  const femaleButton = document.createElement('button');
  femaleButton.textContent = 'נקבה';
  femaleButton.addEventListener('click', listenerFemale);
  messageGender.appendChild(femaleButton);
  conversation.appendChild(messageGender);


  // Message gender result
  //conversation.appendChild(lineBreak);
  const messageGenderResult = document.createElement('div');
  messageGenderResult.classList.add('message', 'chatbot');

  async function listenerMale() {
    setTimeout(function() {
      messageGenderResult.textContent = 'אין בעיה, אפנה אליך בלשון זכר';
      conversation.appendChild(messageGenderResult);
      isMale = true;
      removeListnersForGender();
      setTimeout( function (){
         showUploadButton();
      }, TIMEOUT);
    }, TIMEOUT);
  }

  async function listenerFemale() {
    setTimeout(function() {
      messageGenderResult.textContent = 'אין בעיה, אפנה אלייך בלשון נקבה';
      conversation.appendChild(messageGenderResult);
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

////////////////////////////////////// CROPPING //////////////////////////////////////
/*
function createUserMessage(messageText) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message message-user';

  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.textContent = messageText;

  messageContainer.appendChild(messageContent);

  return messageContainer;
}

const buttonSaveCroppedImage = document.getElementById('save-cropped-image');
buttonSaveCroppedImage.addEventListener('click', function() {
  const canvas = cropper.getCroppedCanvas();
  const croppedImage = new Image();
  croppedImage.src = localStorage.getItem('userPhoto')
  conversation.appendChild(createUserMessage(croppedImage));
  imageCropperOverlay.style.display = 'none';
});

const initCropper = () => {
  const image = document.getElementById('uploaded-image');
  const cropper = new Cropper(image, {
    aspectRatio: 1,
  });
  return cropper;
};

*/
/////////////////////////////////END CROP///////////////////////////////////////////

/*function showLoadingMessage(message) {
  const chatbotResponse = document.createElement("div");
  chatbotResponse.classList.add("message");

  // Add the "loading dots" message
  const loadingMessage = document.createElement("span");
  loadingMessage.classList.add("loader");
  chatbotResponse.appendChild(loadingMessage);

  conversation.appendChild(chatbotResponse);
  conversation.scrollTop = conversation.scrollHeight;

  // Change the message after 2 seconds
  setTimeout(() => {
    loadingMessage.remove();

    const messageHello = document.createElement('span');
    messageHello.textContent = 'היי שלום';

    chatbotResponse.appendChild(messageHello);
  }, 2000);
}*/

function initPage() {
    const messageHello = document.createElement('div');
    messageHello.classList.add('message', 'chatbot');
    messageHello.textContent = 'היי שלום';
    conversation.appendChild(messageHello);

  setTimeout(function() {

    const messageWhoAmI = document.createElement('div');
    messageWhoAmI.classList.add('message', 'chatbot');
    const messageWhoAmI1 = document.createElement('p');
    const messageWhoAmI2 = document.createElement('p');
    messageWhoAmI1.textContent = 'אני AI PuRIM';
    messageWhoAmI2.textContent = 'הבינה המלאכותית שתראה איך תראו בתחפושות מסויימות';
    messageWhoAmI.appendChild(messageWhoAmI1);
    messageWhoAmI.appendChild(messageWhoAmI2);
    conversation.appendChild(messageWhoAmI);

    setTimeout(function () {
      showGender();
    }, TIMEOUT);
  }, TIMEOUT);
}

// Code starts here
initPage();


