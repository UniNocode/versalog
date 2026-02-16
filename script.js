document.addEventListener('DOMContentLoaded', () => {
    // 1. Buscamos todos los contenedores con la clase maestra
    const carousels = document.querySelectorAll('.js-carousel');

    carousels.forEach(carousel => {
        // 2. Selectores internos genéricos
        const viewport = carousel.querySelector('.js-carousel-viewport');
        const prevBtn = carousel.querySelector('[class*="--prev"]');
        const nextBtn = carousel.querySelector('[class*="--next"]');
        const firstItem = carousel.querySelector('.js-carousel-item');

        if (!viewport || !prevBtn || !nextBtn || !firstItem) return;

        // 3. Lógica de movimiento exacta
        const getScrollStep = () => {
            const track = firstItem.parentElement;
            const gap = parseFloat(getComputedStyle(track).gap) || 0;
            return firstItem.offsetWidth + gap;
        };

        // Click Izquierdo: Retrocede (Negativo)
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            viewport.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        });

        // Click Derecho: Avanza (Positivo)
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            viewport.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        });
    });

    console.log('Arquitectura Versalog: Carruseles optimizados.');
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".method-item");

  items.forEach(item => {
    const button = item.querySelector(".method-accordion__button");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // cerrar todos
      items.forEach(i => {
        i.classList.remove("is-open");
        i.querySelector(".method-accordion__button")
         .setAttribute("aria-expanded", "false");
      });

      // abrir solo si estaba cerrado
      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});

/* =========================================
   MODAL DE CONTACTO - JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los triggers de modal
    const modalTriggers = document.querySelectorAll('.js-open-modal');
    const modals = document.querySelectorAll('.js-modal');
    const closeButtons = document.querySelectorAll('.js-close-modal');

    // Función para abrir modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.add('is-active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // Focus en el primer input
        const firstInput = modal.querySelector('.form-input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }

        // Trap focus dentro del modal
        trapFocus(modal);
    }

    // Función para cerrar modal
    function closeModal(modal) {
        modal.classList.remove('is-active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    // Event listeners para abrir modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Event listeners para cerrar modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.js-modal');
            closeModal(modal);
        });
    });

    // Cerrar al hacer clic fuera del modal
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.js-modal.is-active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // Trap focus dentro del modal
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    // Validación y envío del formulario
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validar email obligatorio
            const emailInput = contactForm.querySelector('[name="email"]');
            if (!emailInput.value || !emailInput.validity.valid) {
                emailInput.focus();
                alert('Por favor, ingrese un email válido');
                return;
            }

            // Deshabilitar botón de envío
            const submitButton = contactForm.querySelector('.form-submit');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            
            // Añadir campos necesarios para WordPress AJAX
            formData.append('action', 'send_contact_form');
            formData.append('nonce', versalogAjax.nonce);

            try {
                // Enviar a WordPress AJAX
                const response = await fetch(versalogAjax.ajaxUrl, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.data.message);
                    contactForm.reset();
                    const modal = contactForm.closest('.js-modal');
                    closeModal(modal);
                } else {
                    alert(result.data.message || 'Error al enviar el mensaje. Intente nuevamente.');
                }

            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión. Por favor, intente nuevamente.');
            } finally {
                // Rehabilitar botón
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar';
            }
        });
    }
});

