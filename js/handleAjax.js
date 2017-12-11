(function() {
    window.ajax = function(options) {
        var defaultOptions = {
            async: true
        };
        options = extend(defaultOptions, options);

        var _obj = {
            xhr: createXhr(),
            successCallbacks: [],
            errorCallbacks: [],
            alwaysCallbacks: [],
            options: options
        };
        _obj.before = function(callback) {
            typeof(callback) === 'function' && callback(_obj.xhr);
            return _obj;
        };
        _obj.header = function(name, value) {
            _obj.xhr.setRequestHeader(name, value);
            return _obj;
        };
        _obj.headers = function(headers) {
            if (Object.prototype.toString.call(headers) === '[object Object]') {
                for (var name in headers) {
                    _obj.xhr.setRequestHeader(name, headers[name]);
                }
            }
            return _obj;
        };
        _obj.success = function(callback, jsonForceValidate) {
            _obj.jsonForceValidate = jsonFGorceValidate;

            if (typeof(callback) === 'function') {
                _obj.successCallbacks.push(callback);
            }
            return _obj;
        };

        _obj.error = function(callback) {
            if (typeof(callback) === 'function') {
                _obj.errorCallbacks.push(callback);
            }
            return _obj;
        };
        _obj.always = function(callback) {
            if (typeof(callback) === 'function') {
                _obj.alwaysCallbacks.push(callback);
            }
            return _obj;
        };

        _obj.timeout = function(timeout, callback) {
            _obj.xhr.timeout = timeout;

            if (typeof(callback) === 'function') {
                _obj.xhr.ontimeout = function() {
                    callback(_obj.xhr);
                }
            }
            return _obj;
        };

        _obj.get = function(url, data) {
            if (typeof(url) === 'undefined') throw 'url 不能为空';
            if (Object.prototype.toString.call(data) !== '[object Object]') data = undefined;

            doAjax(_obj, 'get', url, data, 'urlencoded');

            return _obj;
        };

        _obj.post = function(url, data, contentType) {
            if (typeof(url) === 'undefined') throw 'url 不能为空';
            if (Object.prototype.toString.call(data) !== '[object Object]') data = undefined;
            if (typeof(contentType) !== 'string') contentType = 'urlencoded';

            doAjax(_obj, 'post', url, data, contentType);

            return _obj;
        };
    }

    function doAjax(_obj, method, url, data, contentType) {
        var xhr = __obj.xhr;

        data = encodeData(data, contentType);

        if ('get' === method) {
            url += (url.indexOf('?') == -1 ? '?' : '&') + data;
        }

        bindEventHandler();

        xhr.open(method, url, _obj.options.async);
        //send
        if ('post' === method && data) {
            xhr.setRequestHeader('Content-Type', _obj.postContentType);
            xhr.send(data);
        } else {
            xhr.send();
        }
    }

    function encodeData(data, contentType) {
        if (Object.prototype.toString.call(data) === '[object Object]') {
            if ('json' === contentType.toLowerCase() &&
                typeof(JSON) === 'object' &&
                typeof(JSON.stringify) === 'function') {
                _obj.postContentType = 'application/json';
                return JSON.stringify(data);
            } else {
                _obj.postContentType = 'application/x-www-form-urlencoded';
                return encodeParam(data);
            }
        }
    }

    function encodeParam(data) {
        if (Object.prototype.toString.call(data) == '[object Object]') {
            var params = [];
            for (var name in data) {
                var value = data[name];
                if (Object.prototype.toString.call(value) === '[object Array]') {
                    for (var i = 0; i < value.length; ++i) {
                        params.push(name + '=' + encodeURIComponent(data[name]));
                    }
                } else {
                    params.push(name + '=' + encodeURIComponent(data[name]));
                }
                return params.join('&');
            }
        }
    }

    function createXhr() {
        return new XMLHttpRequest();
    }

    function bindEventHandler() {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                for (i = 0, len = _obj.alwaysCallbacks.length; i < len; ++i) {
                    _obj.alwaysCallbacks[i](xhr.status, xhr.responseText, xhr);
                }
                var resText = xhr.responseText;
                var resJson = toJson(resText);

                if (xhr.status === 200) {
                    if (_obj.jsonForceValidate && typeof(resJson) === 'undefined') {
                        for (i = 0, len = _obj.errorCallbacks.length; i < len; ++i) {
                            _obj.errorCallbacks[i](xhr.status, xhr.responseText, xhr);
                        }
                    } else {
                        for (i = 0, len = _obj.successCallbacks.length; i < len; ++i) {
                            _obj.successCallbacks[i](resJson || resText, xhr);
                        }
                    }
                } else {
                    for (i = 0, len = _obj.errorCallbacks.length; i < len; ++i) {
                        _obj.errorCallbacks[i](xhr.status, xhr.responseText, xhr);
                    }
                }
            }
        }
    }

    function toJson(text) {
        var json;
        try {
            if (typeof(JSON) === 'object' && typeof(JSON.parse) === 'function') {
                json = JSON.parse(text);
            } else {
                json = eval(text);
            }
        } catch (e) {

        }
        return json;
    }

    function extend(obj1, obj2) {
        if (Object.prototype.toString.call(obj1) === '[object Object]' &&
            Object.prototype.toString.call(obj2) === '[object Object]') {
            for (var pname in obj2) {
                obj1[pname] = obj2[pname];
            }
        }
        return obj1;
    }
})();