// ES6 or Vanilla JavaScript
const contentsToHide = document.getElementsByClassName('nhsuk-contents-list__list--nested')
for (let ele of contentsToHide) {
  ele.classList.add("nhsuk-u-visually-hidden")
}

const allNestestContents = document.querySelectorAll('.nhsuk-contents-list__link--nested');
allNestestContents.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    link.parentNode.querySelector('.nhsuk-contents-list__list--nested').classList.toggle('nhsuk-u-visually-hidden');
    link.parentNode.querySelector('.nhsuk-contents-list__list--nested').setAttribute("aria-expanded", "true")
  });
});

// JS to handle the register journey hide/show
if (document.getElementById('send-verification-code')) {
  const sendVerificationCodeButton = document.getElementById('send-verification-code');
  const verifyCodeButton = document.getElementById('verifyCodeButton');
  const verifyCodeDiv = document.getElementById('verify-code');
  const changeEmail = document.getElementById('change-email');
  const email = document.getElementById('email');
  sendVerificationCodeButton.addEventListener('click', e => {
    email.disabled = true;
    sendVerificationCodeButton.classList.add('verify-hidden');
    verifyCodeDiv.classList.remove('verify-hidden')
  });
  verifyCodeButton.addEventListener('click', e => {
    verifyCodeDiv.classList.add('verify-hidden');
    changeEmail.classList.remove('verify-hidden');
  });
  changeEmail.addEventListener('click', e => {
    email.disabled = false;
    changeEmail.classList.add('verify-hidden');
    sendVerificationCodeButton.classList.remove('verify-hidden');
  });
}

if(document.getElementById("filter")) {
  const filterDiv = document.getElementById("filter");
  const showFilterButton = document.getElementById('show-filter-button')
  filterDiv.style.display = "none";
  showFilterButton.addEventListener('click', e => {
    e.preventDefault();
    if (showFilterButton.getAttribute('aria-expanded') === 'false') {
      showFilterButton.setAttribute("aria-expanded", 'true'); 
    } else {
      showFilterButton.setAttribute("aria-expanded", 'false'); 
    }
    showFilterButton.textContent = showFilterButton.textContent === 'Filter and sort' ? 'Close filter' : 'Filter and sort';
    filterDiv.style.display = filterDiv.style.display === 'none' ? 'block' : 'none';
  });
}

if(document.getElementById("notAcceptingPatients")) {
  const notAcceptingPatientsCheckbox = document.getElementById("notAcceptingPatients");
  const checkboxes = document.getElementsByClassName("nhsuk-checkboxes__input");
  notAcceptingPatientsCheckbox.addEventListener("click", function() {
    for(let i = 0; i < checkboxes.length - 1; i++) {
      checkboxes[i].checked = false;
    }
  })
}

function Tabs ($module) {
  this.$module = $module
  this.$tabs = $module.querySelectorAll('.govuk-tabs__tab')

  this.keys = { left: 37, right: 39, up: 38, down: 40 }
  this.jsHiddenClass = 'govuk-tabs__panel--hidden'
}

Tabs.prototype.init = function () {
  if (typeof window.matchMedia === 'function') {
    this.setupResponsiveChecks()
  } else {
    this.setup()
  }
}

Tabs.prototype.setupResponsiveChecks = function () {
  this.mql = window.matchMedia('(min-width: 40.0625em)')
  this.mql.addListener(this.checkMode.bind(this))
  this.checkMode()
}

Tabs.prototype.checkMode = function () {
  if (this.mql.matches) {
    this.setup()
  } else {
    this.teardown()
  }
}

Tabs.prototype.setup = function () {
  var $module = this.$module
  var $tabs = this.$tabs
  var $tabList = $module.querySelector('.govuk-tabs__list')
  var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item')

  if (!$tabs || !$tabList || !$tabListItems) {
    return
  }

  $tabList.setAttribute('role', 'tablist')

  nodeListForEach($tabListItems, function ($item) {
    $item.setAttribute('role', 'presentation')
  })

  nodeListForEach($tabs, function ($tab) {
    // Set HTML attributes
    this.setAttributes($tab)

    // Save bounded functions to use when removing event listeners during teardown
    $tab.boundTabClick = this.onTabClick.bind(this)
    $tab.boundTabKeydown = this.onTabKeydown.bind(this)

    // Handle events
    $tab.addEventListener('click', $tab.boundTabClick, true)
    $tab.addEventListener('keydown', $tab.boundTabKeydown, true)

    // Remove old active panels
    this.hideTab($tab)
  }.bind(this))

  // Show either the active tab according to the URL's hash or the first tab
  var $activeTab = this.getTab(window.location.hash) || this.$tabs[0]
  this.showTab($activeTab)

  // Handle hashchange events
  $module.boundOnHashChange = this.onHashChange.bind(this)
  window.addEventListener('hashchange', $module.boundOnHashChange, true)
}

Tabs.prototype.teardown = function () {
  var $module = this.$module
  var $tabs = this.$tabs
  var $tabList = $module.querySelector('.govuk-tabs__list')
  var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item')

  if (!$tabs || !$tabList || !$tabListItems) {
    return
  }

  $tabList.removeAttribute('role')

  nodeListForEach($tabListItems, function ($item) {
    $item.removeAttribute('role', 'presentation')
  })

  nodeListForEach($tabs, function ($tab) {
    // Remove events
    $tab.removeEventListener('click', $tab.boundTabClick, true)
    $tab.removeEventListener('keydown', $tab.boundTabKeydown, true)

    // Unset HTML attributes
    this.unsetAttributes($tab)
  }.bind(this))

  // Remove hashchange event handler
  window.removeEventListener('hashchange', $module.boundOnHashChange, true)
}

Tabs.prototype.onHashChange = function (e) {
  var hash = window.location.hash
  var $tabWithHash = this.getTab(hash)
  if (!$tabWithHash) {
    return
  }

  // Prevent changing the hash
  if (this.changingHash) {
    this.changingHash = false
    return
  }

  // Show either the active tab according to the URL's hash or the first tab
  var $previousTab = this.getCurrentTab()

  this.hideTab($previousTab)
  this.showTab($tabWithHash)
  $tabWithHash.focus()
}

Tabs.prototype.hideTab = function ($tab) {
  this.unhighlightTab($tab)
  this.hidePanel($tab)
}

Tabs.prototype.showTab = function ($tab) {
  this.highlightTab($tab)
  this.showPanel($tab)
}

Tabs.prototype.getTab = function (hash) {
  return this.$module.querySelector('.govuk-tabs__tab[href="' + hash + '"]')
}

Tabs.prototype.setAttributes = function ($tab) {
  // set tab attributes
  var panelId = this.getHref($tab).slice(1)
  $tab.setAttribute('id', 'tab_' + panelId)
  $tab.setAttribute('role', 'tab')
  $tab.setAttribute('aria-controls', panelId)
  $tab.setAttribute('aria-selected', 'false')
  $tab.setAttribute('tabindex', '-1')

  // set panel attributes
  var $panel = this.getPanel($tab)
  $panel.setAttribute('role', 'tabpanel')
  $panel.setAttribute('aria-labelledby', $tab.id)
  $panel.classList.add(this.jsHiddenClass)
}

Tabs.prototype.unsetAttributes = function ($tab) {
  // unset tab attributes
  $tab.removeAttribute('id')
  $tab.removeAttribute('role')
  $tab.removeAttribute('aria-controls')
  $tab.removeAttribute('aria-selected')
  $tab.removeAttribute('tabindex')

  // unset panel attributes
  var $panel = this.getPanel($tab)
  $panel.removeAttribute('role')
  $panel.removeAttribute('aria-labelledby')
  $panel.classList.remove(this.jsHiddenClass)
}

Tabs.prototype.onTabClick = function (e) {
  if (!e.target.classList.contains('govuk-tabs__tab')) {
  // Allow events on child DOM elements to bubble up to tab parent
    return false
  }
  e.preventDefault()
  var $newTab = e.target
  var $currentTab = this.getCurrentTab()
  this.hideTab($currentTab)
  this.showTab($newTab)
  this.createHistoryEntry($newTab)
}

Tabs.prototype.createHistoryEntry = function ($tab) {
  var $panel = this.getPanel($tab)

  // Save and restore the id
  // so the page doesn't jump when a user clicks a tab (which changes the hash)
  var id = $panel.id
  $panel.id = ''
  this.changingHash = true
  window.location.hash = this.getHref($tab).slice(1)
  $panel.id = id
}

Tabs.prototype.onTabKeydown = function (e) {
  switch (e.keyCode) {
    case this.keys.left:
    case this.keys.up:
      this.activatePreviousTab()
      e.preventDefault()
      break
    case this.keys.right:
    case this.keys.down:
      this.activateNextTab()
      e.preventDefault()
      break
  }
}

Tabs.prototype.activateNextTab = function () {
  var currentTab = this.getCurrentTab()
  var nextTabListItem = currentTab.parentNode.nextElementSibling
  if (nextTabListItem) {
    var nextTab = nextTabListItem.querySelector('.govuk-tabs__tab')
  }
  if (nextTab) {
    this.hideTab(currentTab)
    this.showTab(nextTab)
    nextTab.focus()
    this.createHistoryEntry(nextTab)
  }
}

Tabs.prototype.activatePreviousTab = function () {
  var currentTab = this.getCurrentTab()
  var previousTabListItem = currentTab.parentNode.previousElementSibling
  if (previousTabListItem) {
    var previousTab = previousTabListItem.querySelector('.govuk-tabs__tab')
  }
  if (previousTab) {
    this.hideTab(currentTab)
    this.showTab(previousTab)
    previousTab.focus()
    this.createHistoryEntry(previousTab)
  }
}

Tabs.prototype.getPanel = function ($tab) {
  var $panel = this.$module.querySelector(this.getHref($tab))
  return $panel
}

Tabs.prototype.showPanel = function ($tab) {
  var $panel = this.getPanel($tab)
  $panel.classList.remove(this.jsHiddenClass)
}

Tabs.prototype.hidePanel = function (tab) {
  var $panel = this.getPanel(tab)
  $panel.classList.add(this.jsHiddenClass)
}

Tabs.prototype.unhighlightTab = function ($tab) {
  $tab.setAttribute('aria-selected', 'false')
  $tab.parentNode.classList.remove('govuk-tabs__list-item--selected')
  $tab.setAttribute('tabindex', '-1')
}

Tabs.prototype.highlightTab = function ($tab) {
  $tab.setAttribute('aria-selected', 'true')
  $tab.parentNode.classList.add('govuk-tabs__list-item--selected')
  $tab.setAttribute('tabindex', '0')
}

Tabs.prototype.getCurrentTab = function () {
  return this.$module.querySelector('.govuk-tabs__list-item--selected .govuk-tabs__tab')
}

// this is because IE doesn't always return the actual value but a relative full path
// should be a utility function most prob
// http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/
Tabs.prototype.getHref = function ($tab) {
  var href = $tab.getAttribute('href')
  var hash = href.slice(href.indexOf('#'), href.length)
  return hash
}

function nodeListForEach (nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
}

var $tabs = document.querySelectorAll('[data-module="govuk-tabs"]')
  nodeListForEach($tabs, function ($tabs) {
    new Tabs($tabs).init()
})

// MOJ Rich Text
if('contentEditable' in document.documentElement) {
  var RichTextEditor = function(options) {
    this.options = options;
    this.options.toolbar = this.options.toolbar || {
      bold: false,
      italic: false,
      underline: false,
      bullets: true,
      numbers: true
    };
    this.textarea = this.options.textarea;
    this.container = $(this.textarea).parent();

    if (this.container.data('nhsuk-rich-text-editor-initialised')) {
      return
    }

    this.container.data('nhsuk-rich-text-editor-initialised', true);

    this.createToolbar();
    this.hideDefault();
    this.configureToolbar();
    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    };
    this.container.on('click', '.nhsuk-rich-text-editor__toolbar-button', $.proxy(this, 'onButtonClick'));
    this.container.find('.nhsuk-rich-text-editor__content').on('input', $.proxy(this, 'onEditorInput'));
    this.container.find('label').on('click', $.proxy(this, 'onLabelClick'));
    this.toolbar.on('keydown', $.proxy(this, 'onToolbarKeydown'));
  };

  RichTextEditor.prototype.onToolbarKeydown = function(e) {
    var focusableButton;
    switch(e.keyCode) {
      case this.keys.right:
      case this.keys.down:
        focusableButton = this.toolbar.find('button[tabindex=0]');
        var nextButton = focusableButton.next('button');
        if(nextButton[0]) {
          nextButton.focus();
          focusableButton.attr('tabindex', '-1');
          nextButton.attr('tabindex', '0');
        }
        break;
      case this.keys.left:
      case this.keys.up:
        focusableButton = this.toolbar.find('button[tabindex=0]');
        var previousButton = focusableButton.prev('button');
        if(previousButton[0]) {
          previousButton.focus();
          focusableButton.attr('tabindex', '-1');
          previousButton.attr('tabindex', '0');
        }
        break;
    }
  };

  RichTextEditor.prototype.getToolbarHtml = function() {
    var html = '';

    html += '<div class="nhsuk-rich-text-editor__toolbar" role="toolbar">';

    if(this.options.toolbar.bold) {
      html += '<button class="nhsuk-rich-text-editor__toolbar-button nhsuk-rich-text-editor__toolbar-button--bold" type="button" data-command="bold"><span class="nhsuk-u-visually-hidden">Bold</span></button>';
    }

    if(this.options.toolbar.italic) {
      html += '<button class="nhsuk-rich-text-editor__toolbar-button nhsuk-rich-text-editor__toolbar-button--italic" type="button" data-command="italic"><span class="nhsuk-u-visually-hidden">Italic</span></button>';
    }

    if(this.options.toolbar.underline) {
      html += '<button class="nhsuk-rich-text-editor__toolbar-button nhsuk-rich-text-editor__toolbar-button--underline" type="button" data-command="underline"><span class="nhsuk-u-visually-hidden">Underline</span></button>';
    }

    if(this.options.toolbar.bullets) {
      html += '<button class="nhsuk-rich-text-editor__toolbar-button nhsuk-rich-text-editor__toolbar-button--unordered-list" type="button" data-command="insertUnorderedList"><span class="nhsuk-u-visually-hidden">Unordered list</span></button>';
    }

    if(this.options.toolbar.numbers) {
      html += '<button class="nhsuk-rich-text-editor__toolbar-button nhsuk-rich-text-editor__toolbar-button--ordered-list" type="button" data-command="insertOrderedList"><span class="nhsuk-u-visually-hidden">Ordered list</span></button>';
    }

    html += '</div>';
    return html;
  };

  RichTextEditor.prototype.getEnhancedHtml = function(val) {
    return this.getToolbarHtml() + '<div class="nhsuk-textarea nhsuk-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>';
  };

  RichTextEditor.prototype.hideDefault = function() {
    this.textarea = this.container.find('textarea');
    this.textarea.addClass('nhsuk-u-visually-hidden');
    this.textarea.attr('aria-hidden', true);
    this.textarea.attr('tabindex', '-1');
  };

  RichTextEditor.prototype.createToolbar = function() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'nhsuk-rich-text-editor';
    this.toolbar.innerHTML = this.getEnhancedHtml();
    this.container.append(this.toolbar);
    this.toolbar = this.container.find('.nhsuk-rich-text-editor__toolbar');
    this.container.find('.nhsuk-rich-text-editor__content').html(this.textarea.val());
  };

  RichTextEditor.prototype.configureToolbar = function() {
    this.buttons = this.container.find('.nhsuk-rich-text-editor__toolbar-button');
    this.buttons.prop('tabindex', '-1');
    var firstTab = this.buttons.first();
    firstTab.prop('tabindex', '0');
  };

  RichTextEditor.prototype.onButtonClick = function(e) {
    document.execCommand($(e.currentTarget).data('command'), false, null);
  };

  RichTextEditor.prototype.getContent = function() {
    return this.container.find('.nhsuk-rich-text-editor__content').html();
  };

  RichTextEditor.prototype.onEditorInput = function(e) {
    this.updateTextarea();
  };

  RichTextEditor.prototype.updateTextarea = function() {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    this.textarea.val(this.getContent());
  };

  RichTextEditor.prototype.onLabelClick = function(e) {
    e.preventDefault();
    this.container.find('.nhsuk-rich-text-editor__content').focus();
  };
}

var $richTextEditors = document.querySelectorAll('[data-module="nhsuk-rich-text-editor"]');
  nodeListForEach($richTextEditors, function ($richTextEditor) {
    var options = {
      textarea: $($richTextEditor)
    };

    var toolbarAttr = $richTextEditor.getAttribute('data-nhsuk-rich-text-editor-toolbar');
    if (toolbarAttr) {
      var toolbar = toolbarAttr.split(',');
      options.toolbar = {};
      for (var item in toolbar) options.toolbar[toolbar[item]] = true;
    }

    new RichTextEditor(options);
  });
