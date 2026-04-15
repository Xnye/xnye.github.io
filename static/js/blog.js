;(function () {
  var root = document.documentElement

  function each(list, fn) {
    for (var i = 0; i < list.length; i++) {
      fn(list[i], i)
    }
  }

  function setTransitionFlag() {
    root.setAttribute('transition', '')
    window.setTimeout(function () {
      root.removeAttribute('transition')
    }, 360)
  }

  function setActiveValue(selector, value) {
    each(document.querySelectorAll(selector), function (item) {
      var isActive = item.getAttribute('data-value') === String(value)
      if (isActive) {
        blog.addClass(item, 'active')
      } else {
        blog.removeClass(item, 'active')
      }
      item.setAttribute('aria-pressed', isActive ? 'true' : 'false')
    })
  }

  function syncAppearancePanel() {
    var settings = blog.settings || blog.appearance.readStored()
    var fontSizeSlider = document.querySelector('.font-size-slider')
    var fontSizeValue = document.querySelector('.font-size-value')
    var lineHeightSlider = document.querySelector('.line-height-slider')
    var lineHeightValue = document.querySelector('.line-height-value')
    var rainbowSpeedSlider = document.querySelector('.rainbow-speed-slider')
    var rainbowSpeedValue = document.querySelector('.rainbow-speed-value')

    if (fontSizeSlider) fontSizeSlider.value = settings.fontSize
    if (fontSizeValue) fontSizeValue.innerText = settings.fontSize + 'px'
    if (lineHeightSlider) lineHeightSlider.value = settings.lineHeight
    if (lineHeightValue) lineHeightValue.innerText = settings.lineHeight.toFixed(2)
    if (rainbowSpeedSlider) rainbowSpeedSlider.value = settings.rainbowSpeed
    if (rainbowSpeedValue) rainbowSpeedValue.innerText = settings.rainbowSpeed + 's'
    setActiveValue('.settings-options [data-value]', settings.themeMode)
    setActiveValue('.accent-swatches [data-value]', settings.accent)
    setActiveValue('.surface-swatches [data-value]', settings.surface)
    setActiveValue('.rainbow-options [data-value]', settings.rainbow)
  }

  function setSettingsPanelOpen(open) {
    var panel = document.querySelector('.settings-panel')
    var toggle = document.querySelector('.settings-toggle')
    if (!panel || !toggle) return

    if (open) {
      blog.removeClass(panel, 'hide')
      blog.addClass(toggle, 'active')
      toggle.setAttribute('aria-expanded', 'true')
    } else {
      blog.addClass(panel, 'hide')
      blog.removeClass(toggle, 'active')
      toggle.setAttribute('aria-expanded', 'false')
    }
  }

  function applyAppearancePatch(patch) {
    setTransitionFlag()
    blog.updateAppearance(patch)
    syncAppearancePanel()
  }

  function bindAppearanceOptions() {
    each(document.querySelectorAll('.settings-options [data-value]'), function (item) {
      blog.addEvent(item, 'click', function () {
        applyAppearancePatch({
          themeMode: item.getAttribute('data-value')
        })
      })
    })

    each(document.querySelectorAll('.accent-swatches [data-value]'), function (item) {
      blog.addEvent(item, 'click', function () {
        applyAppearancePatch({
          accent: item.getAttribute('data-value')
        })
      })
    })

    each(document.querySelectorAll('.surface-swatches [data-value]'), function (item) {
      blog.addEvent(item, 'click', function () {
        applyAppearancePatch({
          surface: item.getAttribute('data-value')
        })
      })
    })

    each(document.querySelectorAll('.rainbow-options [data-value]'), function (item) {
      blog.addEvent(item, 'click', function () {
        applyAppearancePatch({
          rainbow: item.getAttribute('data-value')
        })
      })
    })


    var rainbowSlider = document.querySelector('.rainbow-speed-slider')
    if (rainbowSlider) {
      blog.addEvent(rainbowSlider, 'input', function () {
        applyAppearancePatch({
          rainbowSpeed: parseInt(rainbowSlider.value, 10)
        })
      })
    }
    var slider = document.querySelector('.font-size-slider')
    if (slider) {
      blog.addEvent(slider, 'input', function () {
        applyAppearancePatch({
          fontSize: parseInt(slider.value, 10)
        })
      })
    }

    var lineHeightSlider = document.querySelector('.line-height-slider')
    if (lineHeightSlider) {
      blog.addEvent(lineHeightSlider, 'input', function () {
        applyAppearancePatch({
          lineHeight: parseFloat(lineHeightSlider.value)
        })
      })
    }

    var reset = document.querySelector('.settings-reset')
    if (reset) {
      blog.addEvent(reset, 'click', function () {
        applyAppearancePatch(blog.appearance.defaults)
      })
    }
  }

  console.info('%c Author %c TMaize', 'background:#4BB596;color:#ffffff;border-radius:2px;', 'color:auto;')
  console.info(
    '%c Build  %c ' +
      blog.buildAt.substr(0, 4) +
      '/' +
      blog.buildAt.substr(4, 2) +
      '/' +
      blog.buildAt.substr(6, 2) +
      ' ' +
      blog.buildAt.substr(8, 2) +
      ':' +
      blog.buildAt.substr(10, 2),
    'background:#4BB596;color:#ffffff;border-radius:2px;',
    'color:auto;'
  )
  console.info('%c GitHub %c https://github.com/TMaize/tmaize-blog', 'background:#4BB596;color:#ffffff;border-radius:2px;', 'color:auto;')

  blog.addLoadEvent = function (func) {
    var oldonload = window.onload
    if (typeof window.onload !== 'function') {
      window.onload = func
    } else {
      window.onload = function () {
        oldonload()
        func()
      }
    }
  }

  blog.addEvent = function (dom, eventName, func, useCapture) {
    if (!dom) return
    if (window.attachEvent) {
      dom.attachEvent('on' + eventName, func)
    } else if (window.addEventListener) {
      dom.addEventListener(eventName, func, useCapture === true)
    }
  }

  blog.addClass = function (dom, className) {
    if (!dom || blog.hasClass(dom, className)) return
    var current = dom.className || ''
    dom.className = blog.trim(current + ' ' + className)
  }

  blog.hasClass = function (dom, className) {
    if (!dom) return false
    var list = (dom.className || '').split(/\s+/)
    for (var i = 0; i < list.length; i++) {
      if (list[i] === className) return true
    }
    return false
  }

  blog.removeClass = function (dom, className) {
    if (!dom || !blog.hasClass(dom, className)) return
    var list = (dom.className || '').split(/\s+/)
    var next = ''
    for (var i = 0; i < list.length; i++) {
      if (list[i] !== className) next += ' ' + list[i]
    }
    dom.className = blog.trim(next)
  }

  blog.trim = function (str) {
    return (str || '').replace(/^\s+|\s+$/g, '')
  }

  blog.htmlEscape = function (str) {
    var temp = document.createElement('div')
    temp.innerText = str
    str = temp.innerHTML
    temp = null
    return str
  }

  blog.encodeHtml = function (html) {
    var temp = document.createElement('div')
    temp.innerText = html
    html = temp.innerHTML
    temp = null
    return html
  }

  blog.encodeRegChar = function (str) {
    var chars = ['\\', '.', '^', '$', '*', '+', '?', '{', '}', '[', ']', '|', '(', ')']
    each(chars, function (c) {
      var reg = new RegExp('\\' + c, 'g')
      str = str.replace(reg, '\\' + c)
    })
    return str
  }

  blog.ajax = function (option, success, fail) {
    var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    var url = option.url
    var method = (option.method || 'GET').toUpperCase()
    var sync = option.sync === false ? false : true
    var timeout = option.timeout || 10000
    var timer = null
    var isTimeout = false

    xmlHttp.open(method, url, sync)
    xmlHttp.onreadystatechange = function () {
      if (isTimeout) {
        fail({ error: 'request timeout' })
        return
      }
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          success(xmlHttp.responseText)
        } else {
          fail({ error: 'request failed', code: xmlHttp.status })
        }
        clearTimeout(timer)
      }
    }

    timer = window.setTimeout(function () {
      isTimeout = true
      fail({ error: 'request timeout' })
      xmlHttp.abort()
    }, timeout)

    xmlHttp.send()
  }

  blog.initClickEffect = function (textArr) {
    function createDOM(text) {
      var dom = document.createElement('span')
      dom.innerText = text
      dom.style.left = 0
      dom.style.top = 0
      dom.style.position = 'fixed'
      dom.style.fontSize = '12px'
      dom.style.whiteSpace = 'nowrap'
      dom.style.webkitUserSelect = 'none'
      dom.style.userSelect = 'none'
      dom.style.opacity = 0
      dom.style.transform = 'translateY(0)'
      return dom
    }

    blog.addEvent(window, 'click', function (ev) {
      var target = ev.target
      while (target && target !== document.documentElement) {
        if (target.tagName && target.tagName.toLowerCase() === 'a') return
        if (blog.hasClass(target, 'footer-btn') || blog.hasClass(target, 'settings-panel')) return
        target = target.parentNode
      }

      var text = textArr[parseInt(Math.random() * textArr.length, 10)]
      var dom = createDOM(text)

      document.body.appendChild(dom)
      var width = parseInt(window.getComputedStyle(dom, null).getPropertyValue('width'), 10)
      var height = parseInt(window.getComputedStyle(dom, null).getPropertyValue('height'), 10)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

      dom.style.left = ev.pageX - width / 2 + 'px'
      dom.style.top = ev.pageY - scrollTop - height + 'px'
      dom.style.opacity = 1

      window.setTimeout(function () {
        dom.style.transition = 'transform 500ms ease-out, opacity 500ms ease-out'
        dom.style.opacity = 0
        dom.style.transform = 'translateY(-26px)'
      }, 20)

      window.setTimeout(function () {
        if (dom.parentNode) dom.parentNode.removeChild(dom)
      }, 520)
    })
  }

  blog.initMath = function () {
    if (typeof renderMathInElement !== 'function') return
    
    each(document.querySelectorAll('.page-post .post'), function (container) {
      if (container.getAttribute('data-math-rendered') === 'true') return
      
      // 处理表格内的数学公式
      each(container.querySelectorAll('table td, table th'), function (cell) {
        if (cell.getAttribute('data-math-rendered') === 'true') return
        renderMathInElement(cell, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false,
          strict: 'ignore'
        })
        cell.setAttribute('data-math-rendered', 'true')
      })
      
      // 处理其他内容
      renderMathInElement(container, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false,
        strict: 'ignore',
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        ignoredClasses: ['nokatex']
      })
      container.setAttribute('data-math-rendered', 'true')
    })
  }

  blog.normalizeRichContent = function (container) {
    if (!container) return

    each(container.querySelectorAll('li > table'), function (table) {
      var parent = table.parentNode
      var rows = table.querySelectorAll('tr')
      if (!parent || rows.length !== 1) return

      var cells = rows[0].querySelectorAll('td,th')
      if (cells.length < 2) return

      var fragments = []
      each(cells, function (cell) {
        fragments.push(blog.trim(cell.textContent))
      })

      var merged = fragments.join('|')
      if (merged.indexOf('$') === -1 && merged.indexOf('\\') === -1) return

      parent.innerHTML = ''
      parent.appendChild(document.createTextNode(merged))
    })

    each(container.querySelectorAll('p'), function (paragraph) {
      var raw = paragraph.textContent || ''
      if (raw.indexOf('\n') === -1 || raw.indexOf('|') === -1) return

      var lines = raw
        .split(/\r?\n/)
        .map(function (line) {
          return blog.trim(line)
        })
        .filter(function (line) {
          return line !== ''
        })

      if (lines.length < 3) return
      if (lines[0].charAt(0) !== '|' || lines[1].charAt(0) !== '|') return

      var separator = lines[1].replace(/[|\s:-]/g, '')
      if (separator !== '' && separator.replace(/—/g, '') !== '') return

      var table = document.createElement('table')
      var thead = document.createElement('thead')
      var tbody = document.createElement('tbody')

      function splitCells(line) {
        var normalized = line.replace(/^\|/, '').replace(/\|$/, '')
        return normalized.split('|').map(function (cell) {
          return blog.trim(cell)
        })
      }

      each(splitCells(lines[0]), function (cellText) {
        var th = document.createElement('th')
        th.innerHTML = cellText
        if (!thead.firstChild) {
          var tr = document.createElement('tr')
          thead.appendChild(tr)
        }
        thead.firstChild.appendChild(th)
      })

      for (var i = 2; i < lines.length; i++) {
        var tr = document.createElement('tr')
        each(splitCells(lines[i]), function (cellText) {
          var td = document.createElement('td')
          td.innerHTML = cellText
          tr.appendChild(td)
        })
        tbody.appendChild(tr)
      }

      table.appendChild(thead)
      table.appendChild(tbody)
      paragraph.parentNode.replaceChild(table, paragraph)
    })
  }

  blog.addLoadEvent(function () {
    if (!document.querySelector('.page-post')) return
    each(document.querySelectorAll('.page-post .post'), function (container) {
      blog.normalizeRichContent(container)
    })
    each(document.getElementsByTagName('table'), function (table) {
      if (table.parentNode && blog.hasClass(table.parentNode, 'table-container')) return
      var wrapper = document.createElement('div')
      wrapper.setAttribute('class', 'table-container')
      table.parentNode.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })
  })

  blog.addLoadEvent(function () {
    var toggle = document.querySelector('.settings-toggle')
    var panel = document.querySelector('.settings-panel')
    if (!toggle || !panel) return

    blog.removeClass(toggle, 'hide')
    syncAppearancePanel()
    setSettingsPanelOpen(false)
    bindAppearanceOptions()

    blog.addEvent(toggle, 'click', function (event) {
      event.stopPropagation()
      setSettingsPanelOpen(blog.hasClass(panel, 'hide'))
    })

    blog.addEvent(panel, 'click', function (event) {
      event.stopPropagation()
    })

    blog.addEvent(document, 'click', function () {
      setSettingsPanelOpen(false)
    })

    blog.addEvent(document, 'keydown', function (event) {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setSettingsPanelOpen(false)
      }
    })

    if (window.matchMedia) {
      var media = window.matchMedia('(prefers-color-scheme: dark)')
      var syncSystemTheme = function () {
        if ((blog.settings || blog.appearance.readStored()).themeMode === 'system') {
          blog.applyAppearance(blog.appearance.readStored())
          syncAppearancePanel()
        }
      }
      if (media.addEventListener) {
        media.addEventListener('change', syncSystemTheme)
      } else if (media.addListener) {
        media.addListener(syncSystemTheme)
      }
    }
  })

  blog.addLoadEvent(function () {
    var el = document.querySelector('.footer-btn.to-top')
    if (!el) return

    function getScrollTop() {
      if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop
      }
      return document.body ? document.body.scrollTop : 0
    }

    function toggleVisible() {
      if (getScrollTop() > 240) {
        blog.addClass(el, 'show')
      } else {
        blog.removeClass(el, 'show')
      }
    }

    blog.addEvent(window, 'scroll', toggleVisible)
    blog.addEvent(
      el,
      'click',
      function (event) {
        window.scrollTo(0, 0)
        if (event.stopPropagation) event.stopPropagation()
      },
      true
    )
    toggleVisible()
  })

  blog.addLoadEvent(function () {
    if (!document.querySelector('.page-post')) return

    var imgMoveOrigin = null
    var restoreLock = false
    var imgArr = document.querySelectorAll('.page-post img')
    var css = [
      '.img-move-bg {',
      '  transition: opacity 300ms ease;',
      '  position: fixed;',
      '  left: 0;',
      '  top: 0;',
      '  right: 0;',
      '  bottom: 0;',
      '  opacity: 0;',
      '  background-color: rgba(0, 0, 0, 0.88);',
      '  z-index: 100;',
      '}',
      '.img-move-item {',
      '  transition: all 300ms ease;',
      '  position: fixed;',
      '  opacity: 0;',
      '  cursor: pointer;',
      '  border-radius: 12px;',
      '  z-index: 101;',
      '}'
    ].join('')
    var styleDOM = document.createElement('style')
    if (styleDOM.styleSheet) {
      styleDOM.styleSheet.cssText = css
    } else {
      styleDOM.appendChild(document.createTextNode(css))
    }
    document.querySelector('head').appendChild(styleDOM)

    function prevent(ev) {
      ev.preventDefault()
    }

    function toCenter() {
      if (!imgMoveOrigin) return

      var width = Math.min(imgMoveOrigin.naturalWidth, parseInt(document.documentElement.clientWidth * 0.9, 10))
      var height = (width * imgMoveOrigin.naturalHeight) / imgMoveOrigin.naturalWidth
      if (window.innerHeight * 0.95 < height) {
        height = Math.min(imgMoveOrigin.naturalHeight, parseInt(window.innerHeight * 0.95, 10))
        width = (height * imgMoveOrigin.naturalWidth) / imgMoveOrigin.naturalHeight
      }

      var img = document.querySelector('.img-move-item')
      if (!img) return
      img.style.left = (document.documentElement.clientWidth - width) / 2 + 'px'
      img.style.top = (window.innerHeight - height) / 2 + 'px'
      img.style.width = width + 'px'
      img.style.height = height + 'px'
    }

    function restore() {
      if (restoreLock) return
      restoreLock = true

      var div = document.querySelector('.img-move-bg')
      var img = document.querySelector('.img-move-item')
      if (!div || !img || !imgMoveOrigin) {
        restoreLock = false
        return
      }

      div.style.opacity = 0
      img.style.opacity = 0
      img.style.left = imgMoveOrigin.x + 'px'
      img.style.top = imgMoveOrigin.y + 'px'
      img.style.width = imgMoveOrigin.width + 'px'
      img.style.height = imgMoveOrigin.height + 'px'

      window.setTimeout(function () {
        restoreLock = false
        if (div.parentNode) div.parentNode.removeChild(div)
        if (img.parentNode) img.parentNode.removeChild(img)
        imgMoveOrigin = null
      }, 300)
    }

    function imgClickEvent(event) {
      imgMoveOrigin = event.target

      var div = document.createElement('div')
      div.className = 'img-move-bg'

      var img = document.createElement('img')
      img.className = 'img-move-item'
      img.src = imgMoveOrigin.src
      img.style.left = imgMoveOrigin.x + 'px'
      img.style.top = imgMoveOrigin.y + 'px'
      img.style.width = imgMoveOrigin.width + 'px'
      img.style.height = imgMoveOrigin.height + 'px'

      div.onclick = restore
      div.onmousewheel = restore
      div.ontouchmove = prevent

      img.onclick = restore
      img.onmousewheel = restore
      img.ontouchmove = prevent
      img.ondragstart = prevent

      document.body.appendChild(div)
      document.body.appendChild(img)

      window.setTimeout(function () {
        div.style.opacity = 1
        img.style.opacity = 1
        toCenter()
      }, 0)
    }

    blog.addEvent(window, 'resize', toCenter)
    each(imgArr, function (img) {
      blog.addEvent(img, 'click', imgClickEvent, true)
    })
  })

  blog.addLoadEvent(function () {
    if (!document.querySelector('.page-post')) return
    each(document.querySelectorAll('.post h1, .post h2'), function (el) {
      blog.addEvent(el, 'click', function () {
        if (el.scrollIntoView) {
          el.scrollIntoView({ block: 'start' })
        }
        if (el.id && history.replaceState) {
          history.replaceState({}, '', '#' + el.id)
        }
      })
    })
  })
})()
