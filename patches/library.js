import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* ENABLE CONFIG WITHOUT MILLENNIUM --------------------------------------------------------------------------------- */

Options.setOptions();

/* REVEAL CONTEXT --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable)' // CONTEXT ENTRY
]);

Zehn.revealSelf('._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');

/* REVEAL DROPDOWN -------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._30wJO3MC4x-I1OWpy1TAeE', [
  '._2oAiZidGyUxL-hfupFDQ2m:not(_2U_Y7A-0lddoJdrJBvf8JE)' // DROPDOWN ENTRY
]);

Zehn.revealSelf('._2oAiZidGyUxL-hfupFDQ2m.zehnReveal');

/* REVEAL NOTIFICATION MENU ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2EstNjFIIZm_WUSKm5Wt7n', [
  '.QFW0BtI4l77AFmv1xLAkx', // ALL
  '._3B8wRA4H7e_oSksYNqpSPv', // STANDARD
  '._25gii5r23MmAqXvLZj24tK', // PINNED WEB
  '._3k90ug209sE23xAMqcM74s' // PINNED DESKTOP
]);

Zehn.revealSelf('.QFW0BtI4l77AFmv1xLAkx.zehnReveal');
Zehn.revealSelf('._3B8wRA4H7e_oSksYNqpSPv.zehnReveal');
Zehn.revealSelf('._25gii5r23MmAqXvLZj24tK.zehnReveal');
Zehn.revealSelf('._3k90ug209sE23xAMqcM74s.zehnReveal');

/* RECALCULATE GRID SPACERS ----------------------------------------------------------------------------------------- */

function recalculateGrid() {
  Zehn.handleOnMutation('._2Nq6ov7A1hGcHXVOXNt_OE', '.DGRkX_HYUzbFaqRysWQVi', (root, target) => {
    const startSpacer = target.firstElementChild;
    const grid = target.querySelector('[role="grid"]');
    const endSpacer = target.lastElementChild;

    var rowHeight = 0;
    const library = document.querySelector('_3xRRJfD2xy95i9NhJxLTp0');
    if (library.classList.contains('LibraryDisplaySizeLarge')) {
      rowHeight = 222;
    } else if (library.classList.contains('LibraryDisplaySizeMedium')) {
      rowHeight = 148;
    } else if (library.classList.contains('LibraryDisplaySizeSmall')) {
      rowHeight = 111;
    }

    var rowCount = grid.getAttribute('aria-rowcount');
    var gap = parseInt(getComputedStyle(grid).getPropertyValue('row-gap'), 10);

    const observer = new MutationObserver(mutations => {
      const cell = grid.querySelector('[role="gridcell"]')?.firstElementChild;
      if (cell) rowHeight = Math.max(rowHeight, Math.round(cell.offsetHeight));

      var firstRow = grid.firstElementChild.getAttribute('aria-rowindex');
      var lastRow = grid.lastElementChild.getAttribute('aria-rowindex');
      var trimmedRowCountStart = firstRow - 1;
      var trimmedRowCountEnd = rowCount - lastRow;

      // target.setAttribute('data-row-height', `${rowHeight}px`);
      // target.setAttribute('data-row-count', rowCount);
      // target.setAttribute('data-trimmed-row-count-start', trimmedRowCountStart);
      // target.setAttribute('data-trimmed-row-count-end', trimmedRowCountEnd);

      // target.style.setProperty('--row-height', `${rowHeight}px`);
      // target.style.setProperty('--row-count', rowCount);
      // target.style.setProperty('--trimmed-row-count-start', trimmedRowCountStart);
      // target.style.setProperty('--trimmed-row-count-end', trimmedRowCountEnd);

      var gridHeight = (rowCount * rowHeight) + (gap * (rowCount - 1));
      target.style.height = `${gridHeight}px`;
      target.setAttribute('data-grid-height', `${gridHeight}px`);

      var startSpacerHeight = (rowHeight + gap) * trimmedRowCountStart;
      startSpacer.style.height = `${startSpacerHeight}px`;
      target.setAttribute('data-start-height', `${startSpacerHeight}px`);

      var endSpacerHeight = (rowHeight + gap) * trimmedRowCountEnd;
      endSpacer.style.height = `${endSpacerHeight}px`;
      target.setAttribute('data-end-height', `${endSpacerHeight}px`);
    });
    observer.observe(grid, { childList: true, subtree: true });

    return observer;
  }, true);
};

// recalculateGrid();

/* ADJUST WIDTH OF GAME FILTERS BASED ON SIDEBAR WIDTH -------------------------------------------------------------- */

Zehn.handleOnMutation('.QsvsRVwbsApgKt1MhM0fz', '.Woh0kBQCmatzC1daBX9i6', (root, target) => {
  const sidebar = root.querySelector('._9sPoVBFyE_vE87mnZJ5aB');

  if (sidebar) {
    var filterWidth = window.innerWidth - sidebar.offsetWidth;
    target.style.width = `${filterWidth}px`;
  }
});

/* TOGGLE NAVBAR BACKGROUND CLASSES BASED ON WHAT LIBRARY PAGE IS OPEN ---------------------------------------------- */

Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._1fuML-ekRbTEzgzC597yGP', 'zehnConsoleOpened');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._1bq4x9pa4-9RLY-dXWUZTp', 'zehnDownloadsOpened');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '.MillenniumSettings', 'zehnMillenniumOpened');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._39RheXihcN6H2k2muQTjkI', 'zehnStickyHeader');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '.RGNMWtyj73_-WdhflrmuY._3WJCt_OkjPA6npxOtguSt5', 'zehnLibraryOpened');

/* TOGGLE ROOT MENU ------------------------------------------------------------------------------------------------- */

Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3s0lkohH8wU2do0K1il28Y', ['#zehnToggleNavigation', '.zehnButton'], (root, target, button) => {
  const btnNavigation = document.getElementById('zehnToggleNavigation');
  if (btnNavigation) {

    const root = document.querySelectorAll('._2UyOBeiSdBayaFdRa39N2O');
    const container = document.querySelector('._3mz8wQ6Q44B8P7pzPP4Iyw');

    if (btnNavigation.classList.contains('zehnToggled')) {
      container.classList.remove('zehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-size-menu-height', '0px');
      root.forEach((element) => {
        element.style.setProperty('height', '0px', 'important');
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('color', 'transparent', 'important');
        element.classList.add('zehnRootHidden');
        element.classList.toggle('zehnRootShown');
      });
    }
    else {
      container.classList.add('zehnMenuOpened');
      document.documentElement.style.setProperty('--zehn-size-menu-height', '32px');
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
}, false);

/* TOGGLE LIBRARY SEARCH SECTION ------------------------------------------------------------------------------------ */

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleSidebarSearch', 'zehnSearchOpened');
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', ['#zehnToggleSidebarSearch', '.zehnButton', '.zehnReveal'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnSearchOpened');
}, false);

/* TOGGLE LIBRARY WHAT'S NEW SECTION -------------------------------------------------------------------------------- */

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleWhatsNew', 'zehnWhatsNewCollapsed');
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._17uEBe5Ri8TMsnfELvs8-N .SMWMsB-gz3WbYRK2HOm7i ._2o5c89vAnrXN8C60QTSMqO > div:nth-child(2)', ['#zehnToggleWhatsNew', '.zehnButton'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnWhatsNewCollapsed');
});

/* ID GAME PAGE SECTIONS -------------------------------------------------------------------------------------------- */

Zehn.findRootsAndTargets('.QsvsRVwbsApgKt1MhM0fz', '.OhSdLYuggDtBcWjYP0j_9', (root, target) => {
  const featured = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(1)');
  const event = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)');
  const community = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)');
  const details = target.querySelector('._2aor4XVOYzN1PBSREk0UbO');

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

Zehn.findRootsAndTargets('.QsvsRVwbsApgKt1MhM0fz', '#zehnGameDetails', (root, target) => {
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

Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleDetails', '.zehnButton', '.zehnReveal', '.zehnToggled'], togglePage, false); // STICKY DETAILS
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleDetails', '.zehnButton', '.zehnReveal', '.zehnToggled'], togglePage, false); // DETAILS
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleCommunity', '.zehnButton', '.zehnReveal'], togglePage, false); // STICKY COMMUNITY
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleCommunity', '.zehnButton', '.zehnReveal'], togglePage, false); // COMMUNITY
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleActivity', '.zehnButton', '.zehnReveal'], togglePage, false); // STICKY ACTIVITY
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleActivity', '.zehnButton', '.zehnReveal'], togglePage, false); // ACTIVITY

/* WRAP NAVIGATION CONTROLS FOR BACKGROUND -------------------------------------------------------------------------- */

Zehn.createContainer('._2D64jIEK7wpUR_NlObDW76', '._2D64jIEK7wpUR_NlObDW76>._25lBLzuVeYAUG279up4xP8:nth-child(2)', ['#zehnForwardsWrapper'], false);
Zehn.createContainer('._2D64jIEK7wpUR_NlObDW76', '._2D64jIEK7wpUR_NlObDW76>._25lBLzuVeYAUG279up4xP8', ['#zehnBackwardsWrapper'], false);

/* ADD SPACER FOR NAVBAR DOWNLOADS STATUS --------------------------------------------------------------------------- */

Zehn.createAdjacentElement('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', ['#zehnDownloadsSpacer']);

/* MOVE VANILLA BUTTONS INTO NAVBAR ---------------------------------------------------------------------------------- */

Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '#zehnDownloadsSpacer', // DOWNLOADS SPACER
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

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleTheaterMode', 'zehnTheaterMode');
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u', ['#zehnToggleTheaterMode', '.zehnButton'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnTheaterMode');
});

/* MOVE LIBRARY SIDEBAR BUTTONS ------------------------------------------------------------------------------------- */

Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._20QAC4WMXm8qFE8waUT5oo', [
  '._2PF_m-I5yte3WnQhpcz8RC' // SIDEBAR BUTTON CATEGORIES
]);
Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._2WgQEFvIzJw_SHNGbjtRFU', [
  '._3AhYljPF4e4E8LaBt-FoY0', // SIDEBAR BUTTON LIBRARY
  '._2CEKFex6JMsAse2lqMMjUp', // SIDEBAR BUTTON COLLECTIONS
  '._1PgAonvorr0o_NMxNKiDFU ._3mzKdQXht__YHo6PX1LmB6' // FILTER CONTROLS
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

/* MOVE NOTES DELETE BUTTON ----------------------------------------------------------------------------------------- */

Zehn.moveAppendAndObserve('._1AL7l2CN6z-vuLfp1iCLa', '.LCeIT0gmFTY8fdfaVgk4j', [
  '._1fu6xumTI1nCY5wc6FG_N2 .tool-tip-source' // NOTES DELETE
]);

/* MOVE SUPERNAV AND ROOT MENU LIST ITEMS INTO CONTAINERS ----------------------------------------------------------- */

Zehn.createIconTitleContainer('.Store_Supernav', '.contextMenuItem');
Zehn.createIconTitleContainer('.Library_Supernav', '.contextMenuItem');
Zehn.createIconTitleContainer('.Community_Supernav', '.contextMenuItem');
Zehn.createIconTitleContainer('.Profile_Supernav', '.contextMenuItem');

Zehn.createIconTitleContainer('.Steam_Root_Menu', '.contextMenuItem');
Zehn.createIconTitleContainer('.View_Root_Menu', '.contextMenuItem');
Zehn.createIconTitleContainer('.Friends_Root_Menu', '.contextMenuItem');
Zehn.createIconTitleContainer('.Games_Root_Menu', '.contextMenuItem');
Zehn.createIconTitleContainer('.Help_Root_Menu', '.contextMenuItem');

/* ADD ICON ELEMENTS TO CLOCK BUTTONS-------------------------------------------------------------------------------- */

Zehn.createIconTitleContainer('.jSQQl34mj8a4NOKubD6AT', '.HijmccPB1BKyhOwhX1EVl');

/* ADD PLAY ICON INTO CONTAINER -------------------------------------------------------------------------------------- */

Zehn.createIconContainer('.jjN9CtYfeIJoHpKOCmKOx', ['.zehnIconContainer']); // COMMUNITY ICON

/* ADD SEPARATOR ELEMENT IN DROPDOWN -------------------------------------------------------------------------------- */

Zehn.createAdjacentElement('._30wJO3MC4x-I1OWpy1TAeE', '._2oAiZidGyUxL-hfupFDQ2m._2U_Y7A-0lddoJdrJBvf8JE', ['.zehnSeparator']);

/* REVEAL SIDEBAR --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._1ZS_xta5HMXzR8JgxDH6n7', [
  '.uE7Pj4tb2n3_Bx4vjEX0a', // SCROLL UP
  '._3AhYljPF4e4E8LaBt-FoY0', // LIBRARY
  '._2CEKFex6JMsAse2lqMMjUp', // COLLECTIONS
  '._3mzKdQXht__YHo6PX1LmB6' // FILTERS (LINUX, SORT BY, READY TO PLAY)
]);

Zehn.revealInner('._1ZS_xta5HMXzR8JgxDH6n7');
// Zehn.revealInner('._3x1HklzyDs4TEjACrRO2tB');

/* REVEAL SIDEBAR GAME LIST ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.ReactVirtualized__Grid__innerScrollContainer', [
  'div[role="gridcell"]' // LIST ENTRY
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealSelf('.ReactVirtualized__Grid__innerScrollContainer>div[role="gridcell"]');

/* REVEAL PLAYBAR --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._9EHg918wH6CQCQlD5PWOO', [
  '._3ydigb6zZAjJ0JCDgHwSYA._2AzIX5kl9k6JnxLfR5H4kX', // PLAY
  '._2q-gZ3XJzlvSGHSF-GvSmi._2AzIX5kl9k6JnxLfR5H4kX', // MENU
  '.zehnButton#zehnToggleActivity', // ACTIVITY
  '.zehnButton#zehnToggleCommunity', // COMMUNITY
  '.zehnButton#zehnToggleDetails', // DETAILS
  '._3oddBTkj_FjknCgBnPqcmQ ._3qDWQGB0rtwM3qpXTb11Q-', // SETTINGS
  '._3qDWQGB0rtwM3qpXTb11Q-._1oYt_BfxCHnA-_6sfUHiNn', // CONTROLLER
  '._3qDWQGB0rtwM3qpXTb11Q- .zvLq1GUCH3yLuqv_TXBJ1', // INFO / SCROLL UP
  '._21hXW2oDD7zvNsoOaW7Yob' // FAVORITE
]);

Zehn.revealInner('._3fLo166MlaNqP8r8tTyRz');
// Zehn.revealInner('._2Nq6ov7A1hGcHXVOXNt_OE');

/* REVEAL URL BAR LIBRARY ------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.UkR3sY319PuaUNuUWks2K', [
  '._2m_orETo6AghzAnc0sISCt' // LIBRARY FAKE INPUT WRAPPER
], [
  'zehnRevealBorderOnly'
]);
Zehn.addRevealClass('.UkR3sY319PuaUNuUWks2K', [
  '._3KaB94Jl4r0hFkthDPJy09', // BUTTONS
  '.extensions-bar-container .extension-button' // EXTENDIUM
]);

Zehn.revealInner('.UkR3sY319PuaUNuUWks2K');
// Zehn.revealInner('.QsvsRVwbsApgKt1MhM0fz');

/* REVEAL MEDIA LIBRARY --------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.YzIcpcz4oFx-nndxro5jE', [
  '._28eIRmQ229ntDIyQXTn3Ub._32Lfwcdolc3ByZWItfR3ni', // BUTTONS
  '._36KTbApKz0VLY9Q6lGt4aH' // SEARCH
]);

Zehn.revealInner('.YzIcpcz4oFx-nndxro5jE');
// Zehn.revealInner('._3nWSY9HJwc9HWeByKWggV6');

/* REVEAL SCREENSHOT ------------------------------------------------------------------------------------------------ */

// Zehn.addRevealClass('.DKXVRVBokaW_Xxo6kyKq0', [
//   '.mZYRu1dN5Q9aQ1r3Cq_NE', // REACTIONS
//   '._28eIRmQ229ntDIyQXTn3Ub._32Lfwcdolc3ByZWItfR3ni.QE3sHW9puNTAjiRDY71Xy' // BUTTONS
// ]);

// Zehn.revealInner('.DKXVRVBokaW_Xxo6kyKq0');

/* REVEAL SERVERS --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2X_ZpO2X_CIOIEfml3ZTcX', [
  '.DialogButton', // BUTTONS
  '.DialogDropDown' // DROPDOWN
]);

Zehn.revealInner('._2X_ZpO2X_CIOIEfml3ZTcX');
// Zehn.revealInner('._2rxrVvbku0AC8Qbequ4-z9');

/* REVEAL SETTINGS + NOTES ------------------------------------------------------------------------------------------ */

Zehn.addRevealClass('.PageListColumn', [
  '._1-vlriAtKYDViAEunue4VO', // LIST ENTRY
  '._2mL2HfT5AkDXRi1YBnRWKa', // CONTROLLER SETTINGS LIST ENTRY
  '._3Sjbkvk647UKKVLX6J7gsW' // NEW NOTE
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealInner('.PageListColumn');

/* REVEAL GROUP CHAT SETTINGS --------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.xSTLmzylFJdIfak7ZdhuA', [
  '._2YV0m3IRCNOoUV9YhJNFnV', // LIST ENTRY
  '._1NqKTWvxtFgflRlqLTtv7e' // LEAVE
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealInner('.xSTLmzylFJdIfak7ZdhuA');

/* REVEAL CONTROLLER SETTINGS --------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2oua5ZJCOVQf0Vwgk7teo', [
  '._3glxw5rYlV6DTRgH3dHWPD' // LIST ENTRY
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealInner('._2oua5ZJCOVQf0Vwgk7teo');

/* REVEAL OVERLAY EXIT ---------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.fi6UDkxJq66MLo2z9wabQ', [
  '.BoygotvcKo4DC4dSix8G3', // CLOSE
  '.mh8m9p4PBg_Qrev1bfTzc' // BACK TO GAME
]);

Zehn.revealInner('.fi6UDkxJq66MLo2z9wabQ');

/* REVEAL OVERLAY WINDOWS ------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._1EI98QaSW75zbVd3gxgBfS', [
  '._3ZLaTxSHxeGcoKlIy_-Z0L' // WINDOW BUTTONS
]);

Zehn.revealInner('._1EI98QaSW75zbVd3gxgBfS');

/* REVEAL CLOCK/TIMER ----------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._1JTFbdOLNdh4RmamEfRS39', [
  '.HijmccPB1BKyhOwhX1EVl' // BUTTONS
]);

Zehn.revealInner('._1JTFbdOLNdh4RmamEfRS39');

/* REVEAL URL BAR --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._26Gmfe09NRsnF7eprTZYdY', [
  '._1W55urU2WazGofFzN0_jHB .DialogInput_Wrapper', // INPUT WRAPPER
  '._1W55urU2WazGofFzN0_jHB:not(:has(input))' // NO INPUT
], [
  'zehnRevealBorderOnly'
]);
Zehn.addRevealClass('._26Gmfe09NRsnF7eprTZYdY', [
  '._2UTNf-Ec4o5_3LPJtc2u7M._1oXr_GpvIgjHasLyU3tBn', // BUTTONS
  '.extensions-bar-container .extension-button' // EXTENDIUM
]);

Zehn.revealInner('._26Gmfe09NRsnF7eprTZYdY');
// Zehn.revealInner('.OverlayBrowser_Browser');
// Zehn.revealInner('.OverlayBrowser_Guides');
// Zehn.revealInner('.OverlayBrowser_Discussion');
// Zehn.revealInner('.OverlayBrowser_DLC');
// Zehn.revealInner('.TabbedPopupBrowser');

/* REVEAL BROWSER TABS ---------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._290hvyptb3mP0rOSaapjgZ', [
  '.aqvbkhC1ejt4s8QvWA-c5' // TAB CONTAINER
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealSelf('.aqvbkhC1ejt4s8QvWA-c5');

/* STARS ON LOGIN --------------------------------------------------------------------------------------------------- */

Zehn.createAdjacentElement('.QsvsRVwbsApgKt1MhM0fz', '._27A5ub1QLLIMmgywKVMg4z', ['#zehnLogin'], true, 'canvas');

Zehn.findRootsAndTargets('.QsvsRVwbsApgKt1MhM0fz', '#zehnLogin', (target) => {
  stars('zehnLogin');
});

function stars(id) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;

  const STAR_COUNT = Math.floor((W * H) / 10000);
  const LAYERS = 3;
  const SHOOT_PROB = 0.001;

  addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    initStars();
  });

  const mouse = { x: W / 2, y: H / 2 };
  addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

  let stars = [];
  let shootingStars = [];

  function rand(a, b) { return a + Math.random() * (b - a); }
  function choice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function initStars() {
    stars = [];
    for (let layer = 0; layer < LAYERS; layer++) {
      const layerCount = Math.max(5, Math.floor(STAR_COUNT * (1 - layer * 0.25)));
      for (let i = 0; i < layerCount; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z: layer,
          size: rand(0.3, 1.6) * (1 - layer * 0.2),
          baseAlpha: rand(0.2, 0.9) * (1 - layer * 0.25),
          twinkleSpeed: rand(0.002, 0.009),
          twinklePhase: Math.random() * Math.PI * 2,
          vx: rand(-0.02, 0.02) * (1 + layer * 0.5),
          vy: rand(-0.02, 0.02) * (1 + layer * 0.5)
        });
      }
    }
  }

  function spawnShootingStar() {
    const fromEdge = Math.random() < 0.5 ? 'top' : 'left';
    const x = fromEdge === 'top' ? rand(0, W) : -50;
    const y = fromEdge === 'top' ? -50 : rand(0, H);
    const angle = Math.atan2(rand(H * 0.2, H), rand(W * 0.2, W));
    const speed = rand(6, 14);
    shootingStars.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: rand(80, 260),
      life: 0,
      maxLife: rand(40, 90),
      alpha: 0.9
    });
  };

  function drawStar(s) {
    const px = s.x + (mouse.x - W / 2) * (s.z * 0.002);
    const py = s.y + (mouse.y - H / 2) * (s.z * 0.002);
    const tw = Math.sin(s.twinklePhase) * 0.5 + 0.5;
    const alpha = Math.max(0, Math.min(1, s.baseAlpha * (0.6 + tw * 0.8)));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#fff';
    const r = Math.max(0.2, s.size * (0.6 + tw * 0.8));
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawShooting(st) {
    ctx.save();
    ctx.globalAlpha = st.alpha * Math.max(0, 1 - st.life / st.maxLife);
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(st.x, st.y);
    ctx.lineTo(st.x - st.vx * st.length / (st.vx * st.vx + st.vy * st.vy) ** 0.5, st.y - st.vy * st.length / (st.vx * st.vx + st.vy * st.vy) ** 0.5);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.beginPath();
    ctx.arc(st.x, st.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  let last = 0;

  function frame(ts) {
    const dt = Math.min(40, ts - last); last = ts;
    ctx.clearRect(0, 0, W, H);

    createSkyGradient(ctx, W, H);

    for (const s of stars) {
      s.x += s.vx * (dt / 16);
      s.y += s.vy * (dt / 16);

      if (s.x < -10) s.x = W + 10;
      if (s.x > W + 10) s.x = -10;
      if (s.y < -10) s.y = H + 10;
      if (s.y > H + 10) s.y = -10;

      s.twinklePhase += s.twinkleSpeed * (dt / 16);
      drawStar(s);
    }

    if (Math.random() < SHOOT_PROB) spawnShootingStar();

    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const st = shootingStars[i];
      st.x += st.vx * (dt / 16);
      st.y += st.vy * (dt / 16);
      st.life += (dt / 16);
      drawShooting(st);
      if (st.life > st.maxLife || st.x > W + 200 || st.y > H + 200) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(frame);
  };

  function createSkyGradient(ctx, width, height) {
    const scheme = getSkyScheme();

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    scheme.stops.forEach(([pos, color]) => grad.addColorStop(pos, color));

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    const gx = width * 0.5;
    const gy = height * scheme.glowPos;
    const gRadius = Math.max(width, height) * 0.6;
    const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, gRadius);
    glow.addColorStop(0, scheme.glow[0]);
    glow.addColorStop(1, scheme.glow[1]);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  function getSkyScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return {
        type: 'vertical',
        stops: [
          [0.00, '#071029'],
          [0.30, '#2b2340'],
          [0.60, '#c46a94'],
          [0.85, '#ffcdb2'],
          [1.00, '#fff8ee']
        ],
        glow: ['rgba(255,180,200,0.26)', 'rgba(255,180,200,0)'],
        glowPos: 0.78
      };
    } else {
      return {
        type: 'vertical',
        stops: [
          [0.00, '#000010'],
          [1.00, '#000000']
        ],
        glow: ['rgba(20,30,60,0.06)', 'rgba(20,30,60,0)'],
        glowPos: 0.9
      };
    }
  };

  initStars();
  requestAnimationFrame((t) => { last = t; frame(t); });

  addEventListener('click', () => {
    for (let i = 0; i < 3; i++) spawnShootingStar();
  });
};