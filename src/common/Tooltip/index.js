/**
 * Tooltip.js
 * A basic script that applies a mouseover tooltip functionality to all elements of a page that have a data-tooltip attribute
 * Matthias Schuetz, http://matthiasschuetz.com
 *
 * Copyright (C) Matthias Schuetz
 * Free to use under the MIT license
 */

/* eslint prefer-arrow-callback: 0 */
/* eslint no-tabs: 0 */
/* eslint no-use-before-define: 0 */
/* eslint indent: 0 */
/* eslint prefer-template: 0 */
/* eslint object-shorthand: 0 */
/* eslint no-mixed-operators: 0 */


(function (root, factory) {
	/* eslint-disable */
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (!root.tooltip) {
		// Browser globals
		root.tooltip = factory(root);
	}
	/* eslint-enable */
}(this, function () {
  const _options = {
    tooltipId: 'tooltip',
    offsetDefault: 15
  };

  function _bindTooltips(elm, resetTooltips) {
    const tooltipText = elm.dataset.title.trim();
    const isBlank = elm.classList.contains('blank');

    if (resetTooltips || isBlank) {
      elm.removeEventListener('mousemove', _onElementMouseMove);
      elm.removeEventListener('mouseout', _onElementMouseOut);
      elm.removeEventListener('mouseover', _onElementMouseOver);
		}

		if (tooltipText && !isBlank) {
			elm.addEventListener('mousemove', _onElementMouseMove);
			elm.addEventListener('mouseout', _onElementMouseOut);
			elm.addEventListener('mouseover', _onElementMouseOver);
		}
	}

	function _createTooltip(text, evt) {
		let tooltipElm = _getTooltipElm();

		if (tooltipElm) {
			tooltipElm.innerHTML = text;
			tooltipElm.style.visibility = 'visible';
		} else {
			tooltipElm = document.createElement('div');
			tooltipElm.innerHTML = text;
			tooltipElm.setAttribute('id', _options.tooltipId);
			document.querySelector('body').appendChild(tooltipElm);
		}
		const offset = _options.offsetDefault;
		const scrollY = window.scrollY || window.pageYOffset;
		const scrollX = window.scrollX || window.pageXOffset;
		let tooltipTop = evt.pageY + offset;
		let tooltipLeft = evt.pageX + offset;

		tooltipTop = (tooltipTop - scrollY + tooltipElm.offsetHeight + 20 >= window.innerHeight ? (tooltipTop - tooltipElm.offsetHeight - 20) : tooltipTop);
		tooltipLeft = (tooltipLeft - scrollX + tooltipElm.offsetWidth + 20 >= window.innerWidth ? (tooltipLeft - tooltipElm.offsetWidth - 20) : tooltipLeft);

		tooltipElm.style.top = tooltipTop + 'px';
		tooltipElm.style.left = tooltipLeft + 'px';
	}

	function _getTooltipElm() {
		return document.querySelector('#' + _options.tooltipId);
	}

	function _onElementMouseMove(evt) {
		const tooltipElm = _getTooltipElm();
		const offset = _options.offsetDefault;
		const scrollY = window.scrollY || window.pageYOffset;
		const scrollX = window.scrollX || window.pageXOffset;
		let tooltipTop = evt.pageY + offset;
		let tooltipLeft = evt.pageX + offset;

		if (tooltipElm) {
			tooltipTop = (tooltipTop - scrollY + tooltipElm.offsetHeight + 20 >= window.innerHeight ? (tooltipTop - tooltipElm.offsetHeight - 20) : tooltipTop);
			tooltipLeft = (tooltipLeft - scrollX + tooltipElm.offsetWidth + 20 >= window.innerWidth ? (tooltipLeft - tooltipElm.offsetWidth - 20) : tooltipLeft);

			tooltipElm.style.top = tooltipTop + 'px';
			tooltipElm.style.left = tooltipLeft + 'px';
		}
	}

	function _onElementMouseOut() {
		const tooltipElm = _getTooltipElm();

		if (tooltipElm) {
			tooltipElm.style.visibility = 'hidden';
		}
	}

	function _onElementMouseOver(evt) {
		const tooltipText = this.getAttribute('data-title');

		if (tooltipText) {
			_createTooltip(tooltipText, evt);
		}
	}

	return {
		setOptions: function (options) {
			for (let option in options) {
				if (Object.prototype.hasOwnProperty.call(_options, option)) {
					_options[ option ] = options[ option ];
				}
			}
		},
		refresh: function (elm) {
			_bindTooltips(elm, true);
		},
		init: function (elm) {
			_bindTooltips(elm);
		},
		removeTooltip: function () {
			const tooltipElm = _getTooltipElm();

			if (tooltipElm) {
				document.body.removeChild(tooltipElm);
			}
		}
	};
}));
