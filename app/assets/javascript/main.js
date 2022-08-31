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
  for(let i = 0; i < checkboxes.length - 1; i++) {
    checkboxes[i].addEventListener('click', function () {
      notAcceptingPatientsCheckbox.checked = false;
    })
  }
  notAcceptingPatientsCheckbox.addEventListener("click", function() {
    for(let i = 0; i < checkboxes.length - 1; i++) {
      checkboxes[i].checked = false;
    }
  })
}

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
