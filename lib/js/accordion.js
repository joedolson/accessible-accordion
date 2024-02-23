window.onload = function () {
	const accordionBlocks = document.querySelectorAll('.wp-block-tb-accordions');

	[...accordionBlocks].forEach(function (accordionBlock) {
		const accordionLabels = accordionBlock.querySelectorAll('.tb__accordion-label');
		const accordionPanels = accordionBlock.querySelectorAll('.tb__accordion-panel');

		accordionLabels.forEach( function ( label, i ) {
			label.setAttribute( 'id', 'accordionlabel_' + i );
			accordionPanels[i].setAttribute( 'aria-labelledby', 'accordionlabel_' + i );
		});

		//check for mouse click or keydown.
		const toggleEvent = function (e) {
			if ( e.type === 'click' ) {
				return true;
			} else if ( e.type === 'keydown' ) {
				const code = e.charCode || e.keyCode;
				if ( code === 32 || code === 13 ) {
					return true;
				}
				if ( code === 37 ) {
					return 'move-left';
				}
				if ( code === 39 ) {
					return 'move-right';
				}
				return false;
			} else {
				return false;
			}
		}; // a11yEvent

		const toggleaccordionClasses = function (label, i) {
			const activeaccordion   = accordionBlock.querySelector('.tb__accordion-label.active');
			const activePanel = accordionBlock.querySelector(
				'.tb__accordion-panel.active'
			);

			activeaccordion.classList.remove('active');
			activeaccordion.setAttribute('aria-selected', false);

			label.classList.add('active');
			label.setAttribute('aria-selected', true);

			activePanel.classList.remove('active');
			activePanel.setAttribute('aria-selected', false);
			activePanel.setAttribute('hidden', true);

			accordionPanels[i].classList.add('active');
			accordionPanels[i].setAttribute('aria-selected', true);
			accordionPanels[i].removeAttribute('hidden');
		};

		const moveaccordionFocus = function ( i ) {
			var label   = accordionLabels[i];
			var labelId = label.getAttribute( 'id' );
			var control = document.getElementById( labelId );
			control.focus();
			toggleaccordionClasses( label, i );
		}

		var total = accordionLabels.length;
		accordionLabels.forEach(function (label, i) {
			if (label.classList.contains('active')) {
				accordionPanels[i].classList.toggle('active');
			}

			label.addEventListener('click', function (e) {
				if (toggleEvent(e) === true) {
					toggleaccordionClasses(label, i);
				}
			});
			label.addEventListener('keydown', function (e) {
				if (toggleEvent(e) === true) {
					toggleaccordionClasses(label, i);
				}
				if ( toggleEvent(e) === 'move-right' && i < total ) {
					moveaccordionFocus( i + 1 );
				}
				if ( toggleEvent(e) === 'move-left' && i > 0 ) {
					moveaccordionFocus( i - 1 );
				}
			});
		});
	}); //accordionBlocks forEach
};
