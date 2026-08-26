class ClCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open"
    });
  }

  connectedCallback() {
    if (this.shadowRoot.querySelector('article')){
      return;
    }

    this.shadowRoot.innerHTML = `
      <article>
        <header>
          <slot name="title"></slot>
        </header>

        <section>
          <slot></slot>
        </section>
      </article>
      <style>
        :host {
          display: block;
        }

        article {
          box-sizing: border-box;
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #ffffff;
        }

        header {
          margin-bottom: 8px;
          color: #1f2937;
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
        }

        section {
          color: #4b5563;
          font-size: 14px;
          line-height: 22px;
        }
      </style>`;
  };
}

if (!customElements.get('cl-card')) {
  customElements.define('cl-card', ClCard);
}