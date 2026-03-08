import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* ENABLE CONFIG WITH MILLENNIUM ------------------------------------------------------------------------------------ */

Options.setOptions();

/* ADJUST WIDTH OF GAME FILTERS BASED ON SIDEBAR WIDTH -------------------------------------------------------------- */

Zehn.waitAndCallback('.QsvsRVwbsApgKt1MhM0fz', '.Woh0kBQCmatzC1daBX9i6', (root, target) => {
  const sidebarWidth = root.querySelector(`._9sPoVBFyE_vE87mnZJ5aB`).offsetWidth;
  const filterWidth = window.innerWidth - sidebarWidth;

  target.style.width = `${filterWidth}px`;
});

/* TOGGLE NAVBAR BACKGROUND CLASSES BASED ON WHAT LIBRARY PAGE IS OPEN ---------------------------------------------- */

function toggleNavbarClass(root, target, pageSelector, toggleName) {
  const page = root.querySelector(pageSelector);
  if (page) {
    if (!target.classList.contains(toggleName)) {
      target.classList.add(toggleName);
    }
  } else if (!page) {
    if (target.classList.contains(toggleName)) {
      target.classList.remove(toggleName);
    }
  }
}

Zehn.waitAndCallback('.QsvsRVwbsApgKt1MhM0fz', '._3Z7VQ1IMk4E3HsHvrkLNgo', (root, target) => {
  toggleNavbarClass(root, target, '._1fuML-ekRbTEzgzC597yGP', 'zehnConsoleOpened');
});
Zehn.waitAndCallback('.QsvsRVwbsApgKt1MhM0fz', '._3Z7VQ1IMk4E3HsHvrkLNgo', (root, target) => {
  toggleNavbarClass(root, target, '._1bq4x9pa4-9RLY-dXWUZTp', 'zehnDownloadsOpened');
});
Zehn.waitAndCallback('.QsvsRVwbsApgKt1MhM0fz', '._3Z7VQ1IMk4E3HsHvrkLNgo', (root, target) => {
  toggleNavbarClass(root, target, '.MillenniumSettings', 'zehnMillenniumOpened');
});
Zehn.waitAndCallback('.QsvsRVwbsApgKt1MhM0fz', '._3Z7VQ1IMk4E3HsHvrkLNgo', (root, target) => {
  toggleNavbarClass(root, target, '._39RheXihcN6H2k2muQTjkI', 'zehnStickyHeader');
});
Zehn.waitAndCallback('.QsvsRVwbsApgKt1MhM0fz', '._3Z7VQ1IMk4E3HsHvrkLNgo', (root, target) => {
  toggleNavbarClass(root, target, '.RGNMWtyj73_-WdhflrmuY._3WJCt_OkjPA6npxOtguSt5', 'zehnLibraryOpened');
});

/* TOGGLE ROOT MENU ------------------------------------------------------------------------------------------------- */

Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3s0lkohH8wU2do0K1il28Y', '#zehnToggleNavigation', false, false, (root, target, button) => {
  const btnNavigation = document.getElementById('zehnToggleNavigation');
  if (btnNavigation) {

    const root = document.querySelectorAll(`._2UyOBeiSdBayaFdRa39N2O`);
    const nav = document.querySelector(`._2D64jIEK7wpUR_NlObDW76`);
    const navbar = document.querySelector(`._3Z7VQ1IMk4E3HsHvrkLNgo`);

    if (btnNavigation.classList.contains(`zehnToggled`)) {
      navbar.classList.remove('zehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-menu-height', '0px');
      root.forEach((element) => {
        element.style.setProperty('height', '0px', 'important');
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('color', 'transparent', 'important');
        element.classList.add('zehnRootHidden');
        element.classList.toggle('zehnRootShown');
      });
    }
    else {
      navbar.classList.add('zehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-menu-height', '32px');
      root.forEach((element) => {
        element.style.setProperty('height', '32px', 'important');
        element.style.setProperty('display', 'block', 'important');
        element.style.setProperty('color', 'var(--zehn-color-text-primary)', 'important');
        element.classList.add('zehnRootShown');
        element.classList.toggle('zehnRootHidden');
      });
    }

    btnNavigation.classList.toggle('zehnToggled');
  }
});

/* TOGGLE LIBRARY SEARCH SECTION ------------------------------------------------------------------------------------ */

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '._9sPoVBFyE_vE87mnZJ5aB', '#zehnToggleSidebarSearch', 'zehnSearchOpened');
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', '#zehnToggleSidebarSearch', false, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnSearchOpened');
});

/* TOGGLE LIBRARY WHAT'S NEW SECTION -------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '._3BFcmjAaMyP6GTPwc0VyWi', '#zehnToggleWhatsNew', 'zehnWhatsNewCollapsed');
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._17uEBe5Ri8TMsnfELvs8-N .SMWMsB-gz3WbYRK2HOm7i ._2o5c89vAnrXN8C60QTSMqO > div:nth-child(2)', '#zehnToggleWhatsNew', true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnWhatsNewCollapsed');
});

/* ID GAME PAGE SECTIONS -------------------------------------------------------------------------------------------- */

Zehn.waitAndCallback('.QsvsRVwbsApgKt1MhM0fz', '.OhSdLYuggDtBcWjYP0j_9', (root, target) => {
  const featured = target.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)`);
  const event = target.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)`);
  const community = target.querySelector(`._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)`);
  const details = target.querySelector(`._2aor4XVOYzN1PBSREk0UbO`);

  if (featured) {
    if (featured.id != 'zehnGameFeaturedEvent') {
      featured.id = 'zehnGameFeaturedEvent';
    }
  }

  if (event) {
    if (event.id != 'zehnGameEvent') {
      event.id = 'zehnGameEvent';
    }
  }

  if (community) {
    if (community.id != 'zehnGameCommunity') {
      community.id = 'zehnGameCommunity';
    }
  }

  if (details) {
    if (details.id != 'zehnGameDetails') {
      details.id = 'zehnGameDetails';
      details.classList.add('zehnDisplayed');
    }
  }
});


/* CHECK GAME DETAILS PANELS FOR WRAPPER ---------------------------------------------------------------------------- */

Zehn.waitAndCallback('.QsvsRVwbsApgKt1MhM0fz', '#zehnGameDetails', (root, target) => {
  const width = target.clientWidth;
  if (target.dataset.width != width) {
    target.dataset.width = width;

    Array.from(target.children).forEach((panel) => {
      if (!panel.classList.contains('vzLedtsu3TtTlKLEKzIhH')) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('vzLedtsu3TtTlKLEKzIhH');
        target.prepend(wrapper);
        wrapper.append(panel);
      }

      if (panel.children.length == 0) {
        target.append(panel);
      }
    });
  }
});

/* TOGGLE GAME PAGE CONTENT ----------------------------------------------------------------------------------------- */

function togglePage(root, target, button) {
  const btnActivity = target.querySelector('.zehnToggleActivity');
  const btnCommunity = target.querySelector('.zehnToggleCommunity');
  const btnDetails = target.querySelector('.zehnToggleDetails');
  const buttons = [btnActivity, btnCommunity, btnDetails];

  if (btnActivity && btnCommunity && btnDetails) {
    const featured = document.getElementById('zehnGameFeaturedEvent');
    const event = document.getElementById('zehnGameEvent');
    const community = document.getElementById('zehnGameCommunity');
    const details = document.getElementById('zehnGameDetails');
    const pages = [featured, event, community, details];

    pages.forEach((page) => {
      if (button == btnActivity) {
        if (page && (page == featured || page == event)) {
          page.classList.add('zehnDisplayed');
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      } else if (button == btnCommunity) {
        if (page && (page == community)) {
          page.classList.add('zehnDisplayed');
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      } else if (button == btnDetails) {
        if (page && (page == details)) {
          page.classList.add('zehnDisplayed');
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      }
    });

    buttons.forEach((element) => {
      if (element == button) {
        element.classList.add('zehnToggled');
      } else {
        element.classList.remove('zehnToggled');
      }
    });
  }
};

Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleDetails', false, true, togglePage); // STICKY DETAILS
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleDetails', false, true, togglePage); // DETAILS
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleCommunity', false, false, togglePage); // STICKY COMMUNITY
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleCommunity', false, false, togglePage); // COMMUNITY
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleActivity', false, false, togglePage); // STICKY ACTIVITY
Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', '.zehnToggleActivity', false, false, togglePage); // ACTIVITY

/* MOVE SUPERNAV INTO MAIN NAVBAR ----------------------------------------------------------------------------------- */

Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._39oUCO1OuizVPwcnnv88no > ._30vB9DdsPK7VrZAbb5Q1Av', [
  '._3Z3ohQ8-1NKnCZkbS6fvy ._2D64jIEK7wpUR_NlObDW76' // NAV
]);
Zehn.removeTarget('.QsvsRVwbsApgKt1MhM0fz', '._39oUCO1OuizVPwcnnv88no > ._30vB9DdsPK7VrZAbb5Q1Av', 1, 1);

/* ADD SPACER FOR NAVBAR DOWNLOADS STATUS --------------------------------------------------------------------------- */

Zehn.waitAndCheckAdditionAndCallback('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', '.zehnDownloadsSpacer', (root, target, addition) => {
  const spacer = document.createElement('div');
  spacer.classList.add('zehnDownloadsSpacer');
  if (!addition) {
    document.querySelector(`._3cykd-VfN_xBxf3Qxriccm`).before(spacer || '');
  }
});

/* MOVE VANILLA BUTTONS INTO NAVBAR ---------------------------------------------------------------------------------- */

Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '.zehnDownloadsSpacer', // DOWNLOADS SPACER
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3yD46y5pd3zOGR7CzKs0mC)', // ACCOUNT
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3mGEzzp18imtSzGPkduedi)', // NOTIFICATIONS
  '._1TdaAqMFadi0UTqilrkelR', // FRIENDS
  '._2EQ7ghgqIdjKv9jsQC0Zq9', // DOWNLOADS
  '._2foCkpRXhqq0UGVE50BWqj', // ADD GAME
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._5wILZhsLODVwGfcJ0hKmJ)', // ANNOUNCEMENTS
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3LKQ3S_yqrebeNLF6aeiog)' // BIG PICTURE
]);
Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(.Utdt7JrpIm5JlpQmqyj1v)' // VR
]);
Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3lRfTo8Wo3phXfE1DvK6QW)' // SOUNDTRACK
]);

/* TOGGLE THEATER MODE AKA REMOVE LIBRARY SIDEBAR ------------------------------------------------------------------- */

Zehn.addButton('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u', '#zehnToggleTheaterMode', true, false, (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnTheaterMode');
});

/* MOVE LIBRARY SIDEBAR BUTTONS ------------------------------------------------------------------------------------- */

Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._20QAC4WMXm8qFE8waUT5oo', [
  '._2PF_m-I5yte3WnQhpcz8RC' // SIDEBAR BUTTON CATEGORIES
]);
Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', [
  '._3AhYljPF4e4E8LaBt-FoY0' // SIDEBAR BUTTON LIBRARY
]);
Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', [
  '._2CEKFex6JMsAse2lqMMjUp' // SIDEBAR BUTTON COLLECTIONS
]);

/* MOVE BROWSER TABS INTO TITLEBAR ---------------------------------------------------------------------------------- */

Zehn.movePrepend('._1UJDmU3N-pkv7oTJ_Zf9nK', '.TabbedPopupBrowser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);
Zehn.movePrepend('._1UJDmU3N-pkv7oTJ_Zf9nK', '.OverlayBrowser_Browser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);

/* MOVE OVERLAY BUTTONS --------------------------------------------------------------------------------------------- */

Zehn.movePrepend('.fbu3l7kPiBeb3EKCjIb8n', '.fi6UDkxJq66MLo2z9wabQ', [
  '_3OzkVrQFFPv0aV41N4MrHV' // OVERLAY BUTTONS
]);

/* MOVE SCREENSHOT ELEMENTS ----------------------------------------------------------------------------------------- */

Zehn.moveAppend('._2p9h7sf5EGrEVlsWxtvUPH', '.DKXVRVBokaW_Xxo6kyKq0', [
  '._3-jI6bR_mj4JCTwXNFFuuL' // SCREENSHOT CAPTION
]);
Zehn.moveAppend('._2p9h7sf5EGrEVlsWxtvUPH', '._1gvujtNl7v7FpJK6kaMeKZ', [
  '._2yt71EY8-YdWa8dBEE1DAW' // ARTWORK DESCRIPTION
]);

/* MOVE NOTES DELETE BUTTON INTO PAGELIST --------------------------------------------------------------------------- */

Zehn.moveAppend('.ModalDialogPopup', '._2kwFFHckg8jvnwJfg9-la8.PageListColumn', [
  '._1fu6xumTI1nCY5wc6FG_N2 .tool-tip-source' // NOTES DELETE
]);
Zehn.removeTarget('._3Sf_ShCtdfWp5P04k2cIgp', '._2kwFFHckg8jvnwJfg9-la8.PageListColumn', 4, 2);