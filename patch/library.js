import Options from './../js/options.js';

/* ENABLE CONFIG WITHOUT MILLENNIUM --------------------------------------------------------------------------------- */

Options.applyOptions();










import Zehn from './../js/zehn.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* SET SCROLLBAR GLYPH COLORS --------------------------------------------------------------------------------------- */

Zehn.setGlyphColor();

/* CREATE SPINNER --------------------------------------------------------------------------------------------------- */

Zehn.createSpinner('html', '.VicgWmz2sj_UUd0XKXvFQ');
Zehn.createSpinner('html', '._3CN5DkgNMvdtT9fJhNOj_v');
Zehn.createSpinner('html', '._2wAKy-0ZkO_vhbiQCP9MgE');

/* REVEAL CONTEXT --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2EstNjFIIZm_WUSKm5Wt7n', [
  '._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem:not(.contextMenuUnselectable, .disabled)' // CONTEXT ENTRY
]);

Zehn.revealSelf('._1n7Wloe5jZ6fSuvV18NNWI.contextMenuItem.zehnReveal');

/* REVEAL DROPDOWN -------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._30wJO3MC4x-I1OWpy1TAeE', [
  '._2oAiZidGyUxL-hfupFDQ2m:not(_2U_Y7A-0lddoJdrJBvf8JE, ._1Sa12sphmVOOs0on58tDn7)' // DROPDOWN ENTRY
]);

Zehn.revealSelf('._2oAiZidGyUxL-hfupFDQ2m.zehnReveal');

/* REVEAL NOTIFICATION MENU ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2EstNjFIIZm_WUSKm5Wt7n', [
  '.QFW0BtI4l77AFmv1xLAkx', // ALL
  '._3B8wRA4H7e_oSksYNqpSPv', // STANDARD
  '._25gii5r23MmAqXvLZj24tK', // PINNED WEB
  '._3k90ug209sE23xAMqcM74s' // PINNED DESKTOP
]);

Zehn.revealSelf('.QFW0BtI4l77AFmv1xLAkx');
Zehn.revealSelf('._3B8wRA4H7e_oSksYNqpSPv');
Zehn.revealSelf('._25gii5r23MmAqXvLZj24tK');
Zehn.revealSelf('._3k90ug209sE23xAMqcM74s');

/* REVEAL EXTENDIUM MENU -------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.extendium-toolbar-manager-context-menu', [
  '.eKmEXJCm_lgme24Fp_HWt' // CONTEXT ENTRY
]);

Zehn.revealSelf('.extendium-toolbar-manager-context-menu .eKmEXJCm_lgme24Fp_HWt.zehnReveal');

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
  }, { shouldObserveTarget: true, shouldDisconnect: false,  shouldAddAttributeFilter: false });
};

// recalculateGrid();

/* ADJUST WIDTH OF GAME FILTERS BASED ON SIDEBAR WIDTH -------------------------------------------------------------- */

Zehn.handleOnMutation('.QsvsRVwbsApgKt1MhM0fz', '.Woh0kBQCmatzC1daBX9i6', (root, target) => {
  const sidebar = root.querySelector('._9sPoVBFyE_vE87mnZJ5aB');

  if (sidebar) {
    var filterWidth = window.innerWidth - sidebar.offsetWidth;
    target.style.width = `${filterWidth}px`;
  }
}, { shouldObserveTarget: false, shouldDisconnect: false, shouldAddAttributeFilter: false });

/* TOGGLE NAVBAR BACKGROUND CLASSES BASED ON WHAT LIBRARY PAGE IS OPEN ---------------------------------------------- */

Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._1fuML-ekRbTEzgzC597yGP', 'zehnConsoleOpened');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._1bq4x9pa4-9RLY-dXWUZTp', 'zehnDownloadsOpened');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '.MillenniumSettings', 'zehnMillenniumOpened');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._39RheXihcN6H2k2muQTjkI', 'zehnStickyHeader');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._3mz8wQ6Q44B8P7pzPP4Iyw', '._3WJCt_OkjPA6npxOtguSt5', 'zehnLibraryOpened');

/* TOGGLE GAME PAGE CLASSES BASED ON WHAT SECTIONS ARE AVAILABLE ---------------------------------------------------- */

Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._2Dd4T78PcCTUVgOtDGFY5j', '#zehnGameActivity' , 'zehnWithActivity');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._2Dd4T78PcCTUVgOtDGFY5j', '#zehnGameCommunity' , 'zehnWithCommunity');
Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._2Dd4T78PcCTUVgOtDGFY5j', '#zehnGameDetails' , 'zehnWithDetails');

/* TOGGLE ROOT MENU ------------------------------------------------------------------------------------------------- */

Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3Z7VQ1IMk4E3HsHvrkLNgo', ['#zehnToggleNavigation', '.zehnButton'], (root, target, button) => {
  const btnNavigation = document.getElementById('zehnToggleNavigation');
  if (btnNavigation) {
    const container = document.querySelector('._3mz8wQ6Q44B8P7pzPP4Iyw');
    container.classList.toggle('zehnMenuOpened', !btnNavigation.classList.contains('zehnToggled'));
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
  const activity = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(2)');
  const community = target.querySelector('._1sZgBDTw5NH-yuVDZK1SUU .vzLedtsu3TtTlKLEKzIhH:nth-of-type(3)');
  const details = target.querySelector('._2aor4XVOYzN1PBSREk0UbO');

  if (featured) {
    if (featured.id != 'zehnGameFeatured') {
      featured.id = 'zehnGameFeatured';
    }
  }

  if (activity) {
    if (activity.id != 'zehnGameActivity') {
      activity.id = 'zehnGameActivity';
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
      target.id = 'zehnDetailsDisplayed';
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
    const container = root.querySelector('.OhSdLYuggDtBcWjYP0j_9');
    const featured = document.getElementById('zehnGameFeatured');
    const activity = document.getElementById('zehnGameActivity');
    const community = document.getElementById('zehnGameCommunity');
    const details = document.getElementById('zehnGameDetails');
    const pages = [featured, activity, community, details];

    pages.forEach((page) => {
      if (button == btnActivity) {
        if (page && (page == featured || page == activity)) {
          page.classList.add('zehnDisplayed');
          container.id = 'zehnActivityDisplayed';
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      } else if (button == btnCommunity) {
        if (page && (page == community)) {
          page.classList.add('zehnDisplayed');
          container.id = 'zehnCommunityDisplayed';
        } else if (page) {
          page.classList.remove('zehnDisplayed');
        }
      } else if (button == btnDetails) {
        if (page && (page == details)) {
          page.classList.add('zehnDisplayed');
          container.id = 'zehnDetailsDisplayed';
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

Zehn.createContainer('._2D64jIEK7wpUR_NlObDW76', '._2D64jIEK7wpUR_NlObDW76>._25lBLzuVeYAUG279up4xP8:nth-child(2)', ['#zehnForwardsWrapper']);
Zehn.createContainer('._2D64jIEK7wpUR_NlObDW76', '._2D64jIEK7wpUR_NlObDW76>._25lBLzuVeYAUG279up4xP8', ['#zehnBackwardsWrapper']);

/* MOVE VANILLA BUTTONS INTO NAVBAR ---------------------------------------------------------------------------------- */

Zehn.moveAppend('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm', [
  '._2EQ7ghgqIdjKv9jsQC0Zq9', // DOWNLOADS
  '._2foCkpRXhqq0UGVE50BWqj', // ADD GAME
  '._1TdaAqMFadi0UTqilrkelR' // FRIENDS
]);

/* TOGGLE THEATER MODE AKA REMOVE LIBRARY SIDEBAR ------------------------------------------------------------------- */

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleTheaterMode', 'zehnTheaterMode');
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u', ['#zehnToggleTheaterMode', '.zehnButton'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnTheaterMode');
});

/* TOGGLE NAVBAR EXPANSION ------------------------------------------------------------------------------------------ */

Zehn.checkButtonToggle('.QsvsRVwbsApgKt1MhM0fz', '#zehnToggleExpandedNavbar', 'zehnExpandedNavbar');
Zehn.createButton('.QsvsRVwbsApgKt1MhM0fz', '._3cykd-VfN_xBxf3Qxriccm._1-9sir4j_KQiMqdkZjQN0u', ['#zehnToggleExpandedNavbar', '.zehnButton'], (root, target, button) => {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnExpandedNavbar');
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

/* MOVE SHOW ALL COLLECTIONS FROM HIDDEN BUTTON --------------------------------------------------------------------- */

Zehn.createTitleContainer('.QsvsRVwbsApgKt1MhM0fz', '._2Q95p8Q2cZFieeOi06-FS9', ['#zehnShowAll']);

/* MOVE BROWSER TABS INTO TITLEBAR ---------------------------------------------------------------------------------- */

Zehn.movePrepend('._1UJDmU3N-pkv7oTJ_Zf9nK', '.TabbedPopupBrowser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);
Zehn.movePrepend('._1UJDmU3N-pkv7oTJ_Zf9nK', '.OverlayBrowser_Browser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);

/* MOVE OVERLAY BUTTONS --------------------------------------------------------------------------------------------- */

Zehn.movePrepend('._3b_pllMxcr_an1aQ5goWvB', '.fi6UDkxJq66MLo2z9wabQ', [
  '._3OzkVrQFFPv0aV41N4MrHV' // OVERLAY BUTTONS
]);

/* MOVE SCREENSHOT ELEMENTS ----------------------------------------------------------------------------------------- */

Zehn.moveAppend('._2p9h7sf5EGrEVlsWxtvUPH', '.DKXVRVBokaW_Xxo6kyKq0', [
  '._3-jI6bR_mj4JCTwXNFFuuL' // SCREENSHOT CAPTION
]);
Zehn.moveAppend('._2p9h7sf5EGrEVlsWxtvUPH', '._1gvujtNl7v7FpJK6kaMeKZ', [
  '._2yt71EY8-YdWa8dBEE1DAW' // ARTWORK DESCRIPTION
]);

/* MOVE NOTES DELETE BUTTON ----------------------------------------------------------------------------------------- */

Zehn.movePrependAndObserve('._1AL7l2CN6z-vuLfp1iCLa', '.LCeIT0gmFTY8fdfaVgk4j', [
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

/* DISABLE BUTTON IF THERE IS NO LINKS PANEL ------------------------------------------------------------------------ */

Zehn.toggleClassWithPresence('.QsvsRVwbsApgKt1MhM0fz', '._2Dd4T78PcCTUVgOtDGFY5j', '._2r4TK4BAuU-J4FuF_O7v_5._3-V8vjmrwuJM6Ws3tsjFJj' , 'zehnWithGameLinks');

/* TOGGLE GAME LINKS ------------------------------------------------------------------------------------------------ */

Zehn.checkButtonToggle('._2Dd4T78PcCTUVgOtDGFY5j', '.zehnToggleGameLinks', 'zehnGameLinksExpanded');

function toggleLinks(root, target, button) {
  Zehn.addRootClassOnToggle(root, target, button, 'zehnGameLinksExpanded');
  root.querySelectorAll('.zehnToggleGameLinks').forEach(linkButton => {
    linkButton.classList.toggle('zehnToggled', root.classList.contains('zehnGameLinksExpanded'));
  });
};

Zehn.createButton('._2Dd4T78PcCTUVgOtDGFY5j', '._2L3s2nzh7yCnNESfI5_dN1._3Yf8b2v5oOD8Wqsxu04ar .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleGameLinks', '.zehnButton', '.zehnReveal'], toggleLinks); // STICKY PLAYBAR
Zehn.createButton('._2Dd4T78PcCTUVgOtDGFY5j', '._3VQUewWB8g6Z5qB4C7dGFr._2iE-78WxX2Pj4GHbq7YJiA .lO1IF132jJ1gc9yz2HYvV', ['.zehnToggleGameLinks', '.zehnButton', '.zehnReveal'], toggleLinks); // PLAYBAR

/* WRAP LOAD MORE --------------------------------------------------------------------------------------------------- */

Zehn.createTitleContainer('._5uvIN6jXDXzzck59F-nhv', '._1EC1xjjUGqI7fqX6PVzJA3', ['.zehnNews']);
Zehn.createTitleContainer('._5uvIN6jXDXzzck59F-nhv', '._39ZurKJQex6v69aXzvc_nj', ['.zehnLoad']);

/* ADD PLAY ICON INTO CONTAINER ------------------------------------------------------------------------------------- */

Zehn.createIconContainer('._3lh8aaHNMcFvupuNhQDfFt', '.jjN9CtYfeIJoHpKOCmKOx', ['.zehnIconContainer']); // COMMUNITY ICON

/* WRAP FRIEND PICKER CLOSE SVG ------------------------------------------------------------------------------------- */

Zehn.createContainer('.ChatRoomGroupInviteDialog', '.FriendPicker_ChosenFriend .SVGIcon_X_Line', ['.zehnBlurWrapper']);

/* ADD ICON ELEMENTS TO GROUP CHAT SETTINGS PAGELIST ---------------------------------------------------------------- */

Zehn.createIconTitleContainer('.LegacyPopup', '._2YV0m3IRCNOoUV9YhJNFnV');

/* ADD SEPARATOR ELEMENT IN DROPDOWN -------------------------------------------------------------------------------- */

Zehn.createAdjacentElement('._30wJO3MC4x-I1OWpy1TAeE', '._2oAiZidGyUxL-hfupFDQ2m._2U_Y7A-0lddoJdrJBvf8JE', ['.zehnSeparator']);

/* ADD SEPARATOR ELEMENT IN NOTIFICATIONS DROPDOWN ------------------------------------------------------------------ */

Zehn.createAdjacentElement('._1UgM1Pm8SbTWX7_2f-crGt', '.MCa4RMSvWJwwWjcZP2wTT', ['.zehnSeparator'], false);

/* REVEAL SIDEBAR --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._1ZS_xta5HMXzR8JgxDH6n7', [
  '.uE7Pj4tb2n3_Bx4vjEX0a', // SCROLL UP
  '._3AhYljPF4e4E8LaBt-FoY0', // LIBRARY
  '._2CEKFex6JMsAse2lqMMjUp', // COLLECTIONS
  '._3mzKdQXht__YHo6PX1LmB6' // FILTERS (LINUX, SORT BY, READY TO PLAY)
]);

Zehn.revealInner('._1ZS_xta5HMXzR8JgxDH6n7');

/* REVEAL SIDEBAR SHOW ALL ------------------------------------------------------------------------------------------ */

Zehn.addRevealClass('._2Q95p8Q2cZFieeOi06-FS9 ', [
  '#zehnShowAll' // BUTTON
]);

Zehn.revealSelf('#zehnShowAll');

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
  '._3qDWQGB0rtwM3qpXTb11Q-', // INFO / SCROLL UP
  '._21hXW2oDD7zvNsoOaW7Yob' // FAVORITE
]);

Zehn.revealInner('._9EHg918wH6CQCQlD5PWOO');

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

/* REVEAL MEDIA LIBRARY --------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.YzIcpcz4oFx-nndxro5jE', [
  '._28eIRmQ229ntDIyQXTn3Ub.QE3sHW9puNTAjiRDY71Xy._32Lfwcdolc3ByZWItfR3ni', // BUTTONS
  '._36KTbApKz0VLY9Q6lGt4aH' // SEARCH
]);

Zehn.revealInner('.YzIcpcz4oFx-nndxro5jE');

/* REVEAL SERVERS --------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._341mdPDkZV7JkbIxGBREsd', [
  '.DialogButton' // FOOTER BUTTONS
]);

Zehn.revealInner('._341mdPDkZV7JkbIxGBREsd');

/* REVEAL SETTINGS + NOTES ------------------------------------------------------------------------------------------ */

Zehn.addRevealClass('.PageListColumn', [
  '._1-vlriAtKYDViAEunue4VO', // LIST ENTRY
  '._2mL2HfT5AkDXRi1YBnRWKa' // CONTROLLER SETTINGS LIST ENTRY
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

/* REVEAL OVERLAY -------------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.fi6UDkxJq66MLo2z9wabQ', [
  '.BoygotvcKo4DC4dSix8G3', // CLOSE
  '.mh8m9p4PBg_Qrev1bfTzc', // BACK TO GAME
  '._3ZLaTxSHxeGcoKlIy_-Z0L' // WINDOW BUTTONS
]);

Zehn.revealInner('.fi6UDkxJq66MLo2z9wabQ');

/* REVEAL CLOCK/TIMER ----------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._2j-W28YC1xAizcE7x9KkDT', [
  '.DialogButton' // BUTTONS
]);

Zehn.revealInner('._2j-W28YC1xAizcE7x9KkDT');

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

/* REVEAL BROWSER TABS ---------------------------------------------------------------------------------------------- */

Zehn.addRevealClass('._290hvyptb3mP0rOSaapjgZ', [
  '.aqvbkhC1ejt4s8QvWA-c5' // TAB CONTAINER
], [
  'zehnRevealBackgroundOnly'
]);

Zehn.revealSelf('.aqvbkhC1ejt4s8QvWA-c5');










import Waifu from './../js/waifu.js';

/* WAiFU DESU ------------------------------------------------------------------------------------------------------- */

Waifu.findWaifu();










import Secret from './../js/secret.js';

/* SUPER SECRET DO NOT LOOK ----------------------------------------------------------------------------------------- */

Secret.discover();










import Canvas from './../js/canvas.js';

/* STARS ON LOGIN --------------------------------------------------------------------------------------------------- */

Canvas.stars();