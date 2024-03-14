window.onload = function () {

	const accordionElements  = document.querySelectorAll( '.ab_accordion-parent' );

	let accordionGroups = [];
	let accordionGroup  = [];
	accordionElements.forEach( function( node, i ) {
		accordionGroup.push( node );
		let nextSibling = node.nextElementSibling;
		if ( null === nextSibling || ! nextSibling.classList.contains( 'ab_accordion-parent' ) ) {
			accordionGroups.push( accordionGroup );
			accordionGroup = [];
		}
	});

	accordionGroups.forEach( function( group, i ) {
		let accordionWrapper = document.createElement( 'div' );
		accordionWrapper.classList.add( 'ab-accordion-group', 'ab-accordion-group-' + i );
		group.forEach( function( node, i ) {
			if ( 0 == i ) {
				node.parentNode.insertBefore( accordionWrapper, node );
			}
			accordionWrapper.appendChild( node );
		});
	});

	const accordionHeaders = document.querySelectorAll('.ab_accordion-header h2');
	const accordionContent = document.querySelectorAll('.ab_accordion-wrapper');
	accordionContent.forEach( function( content, i ) {
		isOpenByDefault = content.classList.contains('default');
		if ( ! isOpenByDefault ) {
			content.style.display = 'none';
		}
	});

	accordionHeaders.forEach( function ( header, i ) {
		let innerContent = header.innerHTML;
		let button = document.createElement( 'button' );
		let icon   = document.createElement( 'span' );
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

	let accordionExclusive = ( null === document.querySelector( '.accordion-exclusive' ) ) ? false : true;

	const toggleAccordionClasses = function(button, i) {
		let buttonState   = button.getAttribute( 'aria-expanded' );
		const targetPanel = button.getAttribute( 'aria-controls' );
		const panel       = document.getElementById( targetPanel );
		const icon        = button.querySelector( 'span' );

		if ( buttonState == 'false' ) {
			if ( accordionExclusive ) {
				let parent = button.closest( '.ab-accordion-group' );
				let thisAccordionGroup = parent.querySelectorAll('.ab_accordion-wrapper')
				let thisAccordionButtons = parent.querySelectorAll( '.ab_accordion-header h2 button' );
				thisAccordionGroup.forEach( function( content, i ) {
					content.style.display = 'none';
				});
				thisAccordionButtons.forEach( function( button, i ) {
					let icon = button.querySelector( 'span' );
					icon.classList.add( 'dashicons-plus' );
					icon.classList.remove( 'dashicons-minus' );
					button.setAttribute( 'aria-expanded', 'false' );
				});
			}
			panel.style.display = 'grid';
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
