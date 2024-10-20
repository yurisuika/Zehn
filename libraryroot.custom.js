import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';
import Zehn from './js/zehn.js';

Zehn.addUserAgent();

Zehn.setOptions();

Zehn.waitForElement('._1FyBL6obxHQ2Z2CsaV2Gbz').then((element) => {
  let cells = document.querySelectorAll('._1-vlriAtKYDViAEunue4VO');
  console.log(cells);
  [].forEach.call(cells, function (el) {
    if(el.innerText.indexOf('Privacy') !== -1) {
      el.style.backgroundImage = 'var(--icon-privacy)';
      console.log(el)
    }
    if(el.innerText.indexOf('Workshop') !== -1) {
      el.style.backgroundImage = 'var(--icon-store)';
      console.log(el)
    }
    if(el.innerText.indexOf('DLC') !== -1) {
      el.style.backgroundImage = 'var(--icon-shop)';
      console.log(el)
    }
    if(el.innerText.indexOf('Controller') !== -1) {
      el.style.backgroundImage = 'var(--icon-controller)';
      console.log(el)
    }
    if(el.innerText.indexOf('Betas') !== -1) {
      el.style.backgroundImage = 'var(--icon-update-dev)';
      console.log(el)
    }
    if(el.innerText.indexOf('Installed Files') !== -1) {
      el.style.backgroundImage = 'var(--icon-apps-all)';
      console.log(el)
    }
    if(el.innerText.indexOf('Updates') !== -1) {
      el.style.backgroundImage = 'var(--icon-update)';
      console.log(el)
    }
    if(el.innerText.indexOf('Compatibility') !== -1) {
      el.style.backgroundImage = 'var(--icon-switch)';
      console.log(el)
    }
    if(el.innerText.indexOf('General') !== -1) {
      el.style.backgroundImage = 'var(--icon-home)';
      console.log(el)
    }
    if(el.innerText.indexOf('Game Recording') !== -1) {
      el.style.backgroundImage = 'var(--icon-record)';
      console.log(el)
    }
  });
});

function addButtonSidebar() {
  var btn = document.createElement('button');
  btn.classList.add('ZehnButton');
  btn.id = 'toggleSidebar';
  btn.type = 'button';
  btn.value = 'close';
  btn.name = 'button';
  btn.onclick = function () {
    var btnSidebar = document.getElementById('toggleSidebar');
    var btnLibrary = document.getElementById('toggleLibrary');
    var sidebar = document.querySelector(`._9sPoVBFyE_vE87mnZJ5aB`);
    if (btnSidebar.value == 'close') {
      btnSidebar.value = 'open';
      btnLibrary.value = 'open';
      btnLibrary.style.display = 'block';
      sidebar.style.setProperty('transform', 'scaleX(0)', 'important');
      sidebar.style.setProperty('min-width', '0px', 'important');
      sidebar.style.setProperty('max-width', '0px', 'important');
    }
    else if (btnSidebar.value = 'open') {
      btnSidebar.value = 'close';
      btnLibrary.value = 'close';
      btnLibrary.style.display = 'none';
      sidebar.style.setProperty('transform', 'none', 'important');
      sidebar.style.setProperty('min-width', '288px', 'important');
      sidebar.style.setProperty('max-width', 'calc(min(50%, 100% - 400px))', 'important');
    }
  };
  document.querySelector(`._2WgQEFvIzJw_SHNGbjtRFU`).prepend(btn);
  var icon = document.createElement('div');
  icon.id = 'toggleSidebarIcon';
  document.getElementById('toggleSidebar').append(icon);
}

Zehn.waitForElement('._2TKEazUUS3TlniZfpc8OOe').then((element) => {
  var observer = new MutationObserver(function(mutations, observer) {
      if (document.querySelector('.RGNMWtyj73_-WdhflrmuY').querySelector('#toggleSidebar') == null) {
          addButtonSidebar();
      }
  });
  observer.observe(document, {subtree: true, attributes: true});
});

function addButtonLibrary() {
  var btn = document.createElement('button');
  btn.classList.add('ZehnButton');
  btn.classList.add('DialogButton');
  btn.id = 'toggleLibrary';
  btn.type = 'button';
  btn.value = 'close';
  btn.name = 'button';
  btn.onclick = function () {
    var btnSidebar = document.getElementById('toggleSidebar');
    var btnLibrary = document.getElementById('toggleLibrary');
    var sidebar = document.querySelector(`._9sPoVBFyE_vE87mnZJ5aB`);
    if (btnLibrary.value == 'close') {
      btnSidebar.value = 'open';
      btnLibrary.value = 'open';
      btnLibrary.style.display = 'block';
      sidebar.style.setProperty('transform', 'scaleX(0)', 'important');
      sidebar.style.setProperty('min-width', '0px', 'important');
      sidebar.style.setProperty('max-width', '0px', 'important');
    }
    else if (btnLibrary.value = 'open') {
      btnSidebar.value = 'close';
      btnLibrary.value = 'close';
      btnLibrary.style.display = 'none';
      sidebar.style.setProperty('transform', 'none', 'important');
      sidebar.style.setProperty('min-width', '288px', 'important');
      sidebar.style.setProperty('max-width', 'calc(min(50%, 100% - 400px))', 'important');
    }
  };
  document.querySelector(`._2Nq6ov7A1hGcHXVOXNt_OE`).append(btn);
  var icon = document.createElement('div');
  icon.id = 'toggleLibraryIcon';
  document.getElementById('toggleLibrary').append(icon);
}

Zehn.waitForElement('._2Nq6ov7A1hGcHXVOXNt_OE').then((element) => {
  var observer = new MutationObserver(function(mutations, observer) {
      if (document.querySelector('._2Nq6ov7A1hGcHXVOXNt_OE').querySelector('#toggleLibrary') == null) {
          addButtonLibrary();
      }
  });
  observer.observe(document, {subtree: true, attributes: true});
});

Zehn.waitForElement('._3cykd-VfN_xBxf3Qxriccm').then((element) => {
  Zehn.appendElements(
    '._3cykd-VfN_xBxf3Qxriccm',
    [
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3mGEzzp18imtSzGPkduedi)', // NOTIFICATIONS
      '._1TdaAqMFadi0UTqilrkelR', // FRIENDS
      '._2EQ7ghgqIdjKv9jsQC0Zq9', // DOWNLOADS
      '._2foCkpRXhqq0UGVE50BWqj', // ADD GAME
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._5wILZhsLODVwGfcJ0hKmJ)', // ANNOUNCEMENTS
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3LKQ3S_yqrebeNLF6aeiog)' // BIG PICTURE
    ]
  )
});

Zehn.waitForElement('._3lRfTo8Wo3phXfE1DvK6QW').then((element) => {
  Zehn.appendElements(
    '._3cykd-VfN_xBxf3Qxriccm',
    [
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3lRfTo8Wo3phXfE1DvK6QW)' // VR
    ]
  )
});

Zehn.waitForElement('.Utdt7JrpIm5JlpQmqyj1v').then((element) => {
  Zehn.appendElements(
    '._3cykd-VfN_xBxf3Qxriccm',
    [
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(.Utdt7JrpIm5JlpQmqyj1v)' // SOUNDTRACK
    ]
  )
});

Zehn.waitForElement('.OverlayBrowser_Browser .TitleBar.title-area').then((element) => {
  Zehn.prependElements(
    '.OverlayBrowser_Browser .TitleBar.title-area',
    [
      '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
    ]
  )
});

Zehn.waitForElement('.TabbedPopupBrowser .TitleBar.title-area').then((element) => {
  Zehn.prependElements(
    '.TabbedPopupBrowser .TitleBar.title-area',
    [
      '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
    ]
  )
});

Zehn.waitForElement('.fbu3l7kPiBeb3EKCjIb8n').then((element) => {
  var observer = new MutationObserver(function(mutations, observer) {
    Zehn.prependElements(
      '.fi6UDkxJq66MLo2z9wabQ',
      [
        '.fbu3l7kPiBeb3EKCjIb8n' // OVERLAY BUTTONS
      ]
    )
  });
  observer.observe(document, {subtree: true, attributes: true});
});

Zehn.waitForElement('._2WgQEFvIzJw_SHNGbjtRFU').then((element) => {
  var observer = new MutationObserver(function(mutations, observer) {
    Zehn.appendElements(
      '._2WgQEFvIzJw_SHNGbjtRFU',
      [
        '._2TKEazUUS3TlniZfpc8OOe' // SIDEBAR BUTTONS
      ]
    )
  });
  observer.observe(document, {subtree: true, attributes: true});
});

Zehn.waitForElement('.DKXVRVBokaW_Xxo6kyKq0').then((element) => {
  var observer = new MutationObserver(function(mutations, observer) {
    Zehn.appendElements(
      '.DKXVRVBokaW_Xxo6kyKq0',
      [
        '._3-jI6bR_mj4JCTwXNFFuuL' // SCREENSHOT CAPTION
      ]
    )
  });
  observer.observe(document, {subtree: true, attributes: true});
});

// Zehn.waitForElement('._2q70uOe6xM3-c5XIVfBLe6 ._2rqTSCLSSEycEiuCS_OkpX').then((element) => {
//   var observer = new MutationObserver(function(mutations, observer) {
//     Zehn.appendElements(
//       '._2q70uOe6xM3-c5XIVfBLe6 ._2rqTSCLSSEycEiuCS_OkpX',
//       [
//         '._2q70uOe6xM3-c5XIVfBLe6 ._1tBzypb5E2AwNuBuVns9Hl' // SHOWCASE DROPDOWN
//       ]
//     )
//   });
//   observer.observe(document, {subtree: true, attributes: true});
// });

// function setListSize() {
//   var panels = document.querySelector('.ReactVirtualized__Grid__innerScrollContainer').children;
//   for (var index = 0; index < panels.length; index++) {
//     var panel = panels[index];
//     if (parseInt(panel.style.height) == 26) {
//       panel.style.setProperty('height', '32px', 'important');
//       panel.style.setProperty('line-height', '32px', 'important');
//       panel.style.setProperty('top', ((parseInt(panel.style.top, 10) / 26) * 32) + 'px', 'important');
//     }
//   }
// }
//
// Zehn.waitForElement('.ReactVirtualized__Grid__innerScrollContainer').then((element) => {
//     setListSize()
//     new MutationObserver(() => setListSize()).observe(document.querySelector('.ReactVirtualized__Grid__innerScrollContainer'), {childList: true, subtree: true});
// });