window.onload = function () {

	const accordionHeaders = document.querySelectorAll('.ab_accordion-header h2');
	const accordionContent = document.querySelectorAll('.ab_accordion-wrapper');

	accordionContent.forEach( function( content, i ) {
		isOpenByDefault = content.classList.contains('default');
		if ( ! isOpenByDefault ) {
			content.style.display = 'none';
		}
	});

	accordionHeaders.forEach( function ( header, i ) {
		var innerContent = header.innerHTML;
		var button = document.createElement( 'button' );
		var icon   = document.createElement( 'span' );
		icon.classList.add( 'dashicons', 'dashicons-plus' );
		icon.setAttribute( 'aria-hidden', true );
		button.innerHTML = innerContent;
		button.setAttribute( 'aria-controls', 'accordioncontent_' + i );
		accordionContent[i].setAttribute( 'id', 'accordioncontent_' + i );
		button.setAttribute( 'aria-expanded', 'false' );
		button.setAttribute( 'type', 'button' );
		button.appendChild( icon );
		header.innerHTML = '';
		header.appendChild( button );

		button.addEventListener('click', function () {
			toggleAccordionClasses(button, i);
		});
	});

	const toggleAccordionClasses = function(button, i) {
		var buttonState = button.getAttribute( 'aria-expanded' );
		var targetPanel = button.getAttribute( 'aria-controls' );
		var panel       = document.getElementById( targetPanel );
		var icon        = button.querySelector( 'span' );

		if ( buttonState == 'false' ) {
			panel.style.display = 'block';
			button.setAttribute( 'aria-expanded', 'true' );
			icon.classList.add( 'dashicons-minus' );
			icon.classList.remove( 'dashicons-plus' );
		} else {
			panel.style.display = 'none';
			button.setAttribute( 'aria-expanded', 'false' );
			icon.classList.remove( 'dashicons-minus' );
			icon.classList.add( 'dashicons-plus' );
		}
	};
};
