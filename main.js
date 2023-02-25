const conversation = document.getElementById('conversation');
let selectedCostume = '';
let isMale = true;
let counterTimes = 0;
const lineBreak = document.createElement('br');
const TIMEOUT = 800;

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

      const messageWhileLoading = document.createElement('div');
      messageWhileLoading.classList.add('loader');
      messageWhileLoading.textContent = 'התמונה בטעינה...';
      chatbotResponse.appendChild(messageWhileLoading);
      conversation.appendChild(chatbotResponse);
      conversation.scrollTop = conversation.scrollHeight;

      // uploaded
      const imgElement = document.createElement('img');
      imgElement.classList.add('user-image-' + selectedCostume,'display-none');
      imgElement.src = localStorage.getItem('userPhoto');
      chatbotResponse.appendChild(imgElement);
      // our image
      const refElement = document.createElement('img');
      refElement.classList.add('reference-image','display-none');
      refElement.src = 'img/' + selectedCostume + '.jpg';
      chatbotResponse.appendChild(refElement);

      refElement.onload = () => {
        /*conversation.appendChild(chatbotResponse);*/
        refElement.classList.remove('display-none');
        refElement.classList.add('display-ok')
        imgElement.classList.remove('display-none');
        imgElement.classList.add('display-ok')
        chatbotResponse.removeChild(messageWhileLoading);
        conversation.scrollTop = conversation.scrollHeight;
      };



      setTimeout(function () {
        showCostumeOptions();
      }, TIMEOUT);
    }, TIMEOUT+TIMEOUT);
  }, TIMEOUT);
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

    /*  messageCotumesButtons.appendChild(chatLine1);
      messageCotumesButtons.appendChild(chatLine2);
      messageCotumesButtons.appendChild(chatLine3);*/

      // Batman
      const batmanButton = document.createElement('button');
      batmanButton.textContent = 'בטמן';
      batmanButton.classList.add('line');
      batmanButton.addEventListener('click', listenerBatman);
      //chatLine1.appendChild(batmanButton);
      messageCotumesButtons.appendChild(batmanButton);

      // Cowboy
      const cowboyButton = document.createElement('button');
      cowboyButton.textContent = isMale ? 'קאובוי' : 'קאוגירל';
      cowboyButton.classList.add('line');
      cowboyButton.addEventListener('click', listenerCowboy);
      //chatLine1.appendChild(cowboyButton);
      messageCotumesButtons.appendChild(cowboyButton);

      // Doctor
      const doctorButton = document.createElement('button');
      doctorButton.textContent = isMale ? 'רופא' : 'רופאה';
      doctorButton.classList.add('line');
      doctorButton.addEventListener('click', listenerDoctor);
      //chatLine1.appendChild(doctorButton);
      messageCotumesButtons.appendChild(doctorButton);

      // Fairy
      const fairyButton = document.createElement('button');
      fairyButton.textContent = 'פייה';
      fairyButton.classList.add('line');
      fairyButton.addEventListener('click', listenerFairy);
      //chatLine1.appendChild(fairyButton);
      messageCotumesButtons.appendChild(fairyButton);


      // HP
      const hpButton = document.createElement('button');
      hpButton.textContent = 'הארי פוטר';
      hpButton.classList.add('line');
      hpButton.addEventListener('click', listenerHP);
      //chatLine2.appendChild(hpButton);
      messageCotumesButtons.appendChild(hpButton);

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
      pirateButton.classList.add('line');
      pirateButton.addEventListener('click', listenerPirate);
      //chatLine2.appendChild(pirateButton);
      messageCotumesButtons.appendChild(fairyButton);

      // Spiderman
      const spidermanButton = document.createElement('button');
      spidermanButton.textContent = 'ספיידרמן';
      spidermanButton.addEventListener('click', listenerSpiderman);
      //chatLine3.appendChild(spidermanButton);
      messageCotumesButtons.appendChild(spidermanButton);

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

      async function listenerDoctor() {
        doctorButton.classList.add('clicked')
        selectedCostume = 'doctor';
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

      async function listenerSpiderman() {
        spidermanButton.classList.add('clicked')
        selectedCostume = 'spiderman';
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
  const messageUploadP3 = document.createElement('p');
  const messageUploadP4 = document.createElement('p');
  messageUploadP1.textContent = 'כדי שאוכל להלביש אותך בתחפושת, ראשית '+
                                  (isMale?'אתה צריך':'את צריכה')+
                                 ' לעלות תמונת פרופיל.';
  ;
  messageUploadP2.textContent = 'לתוצאות הטובות ביותר, אני ממליצה להצטלם:';
  messageUploadP3.textContent = '1. תמונת פנים בלבד כאשר הן פונות ישר למצלמה';
  messageUploadP4.textContent = '2. על רקע לבן';
  messageUploadImage.appendChild(messageUploadP1);
  messageUploadImage.appendChild(messageUploadP2)
  messageUploadImage.appendChild(messageUploadP3);
  messageUploadImage.appendChild(messageUploadP4);
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

      function handleFileSelect(event) { // added 'event' parameter to handleFileSelect function
        const file = event.target.files[0];
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.addEventListener('load', event => {
            const dataUrl = event.target.result;
            localStorage.setItem('userPhoto', dataUrl);
            console.log('in handleFileSelect event load');
            uploadButton.removeEventListener('click', handleFileUpload);
            // show for the first time
            setTimeout(function (){
              showCostumeOptions();
            }, TIMEOUT);


          }, { once: true });
          reader.readAsDataURL(file);
          console.log('end of handleFileSelect');
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
  messageBeforeGender.textContent = 'לפני שנתחיל, באיזו לשון פנייה להשתמש?';
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

// Code starts here
initPage();

const textPostImageResultFemale = ['מצויין, התמונה עלתה',
  'חחחחחחחחחח אהבת?? מה באמת חשבת אני עכשיו אתחיל לעבד תמונות בשבילך? כאילו אין לי משהו יותר טוב לעשות. היית צריכה לראות את האכזבה שלך בעיניים. וואי הרגת אני פיפי',
  'נו מה את אומרת? פתאום זה קטע הא?', 'העיקר בהתחלה צחקת עליי והנה תראי אותך',
  'חחחח מישהי פה התמכרה',
  'נשמההה מישהי פה נהיית אחות בלב',
  'טוב מאמי אין לי באמת את כל היום, עוד אנשים רוצים לדבר איתי',
  'שמעי אני זזה, שמה את עצמי על בינה אוטומטית. את יכולה להמשיך ללחוץ אבל אני לא פה. ביי חיים.'];

const textPostImageResultMale = ['מצויין, התמונה עלתה',
  'חחחחחחחחחח אהבת?? מה באמת חשבת אני עכשיו אתחיל לעבד תמונות בשבילך? כאילו אין לי משהו יותר טוב לעשות. היית צריכה לראות את האכזבה שלך בעיניים. וואי הרגת אני פיפי',
  'נו מה אתה אומר? איך יצא הפעם? אהבת?', 'העיקר בהתחלה צחקת עליי והנה תראה אותך.',
  'חחחח מישהו פה התמכר',
  'אתה לא יכול בלעדיי הא?',
  'מאמי אתה קצת מגזים. אין לך בינות אחרות לדבר איתן?',
  'טוב חלאס. אני שמה את עצמי על בינה אוטומטית. מבחינתי תלחץ, תעשה מה בא לך אני עפתי. סלמתק.'];
