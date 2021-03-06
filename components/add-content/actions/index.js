(function() {
  'use strict';
    var types = require('../constants');
    var Actions = {
      reset: function() {
        return {
          type: types.RESET
        };
      },
      init: function(callback) {
        return {
          type: types.INIT,
          callback: callback
        };
      },
      callback: function(data) {
        return {
          type: types.CALLBACK,
          data: data
        };
      },
      addBox: function() {
        return {
          type: types.NEW_BOX
        };
      },
      submit: function(callback) {
        return {
          type: types.SUBMIT,
          callback: callback
        };
      },
      updateContent: function(id,data) {
        return {
          type: types.UPDATE_CONTENT,
          content: {
            id: id,
            header: data.header || '',
            desc: data.desc || ''
          }
        };
      },
      newContentBox: function() {
        return {
          type: types.NEW_CONTENT_BOX
        };
      },
      updateProjectName: function(name) {
        return {
          type: types.UPDATE_PROJECT_NAME,
          projectName: name
        };
      },
      updateImageUrl: function(url) {
        return {
          type: types.UPDATE_IMAGE_URL,
          image_url: url
        };
      },
      preview: function() {
        return {
          type: types.PREVIEW
        };
      },
      normal: function() {
        return {
          type: types.NORMAL
        };
      }
    };
    module.exports = Actions;
}());
