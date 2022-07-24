const tabs = (tabsSelectors, tabsContent, activeClass, plugSelector) => {
  class Tabs {
    constructor(selectors, content, active, plug) {
      this._tabsSelectors = document.querySelectorAll(selectors);
      this._tabsContent = document.querySelectorAll(content);
      this._tabsContentWrapper = this._tabsContent[0].parentNode;
      this._plug = document.querySelector(plug);
      this._filterClass = '';
      this._activeClass = active;

      this._tabsContent.forEach((item) => {
        item.classList.add('animated', 'fadeIn');
      });
      this._plug.classList.add('animated', 'fadeIn');

      this._tabsSelectors.forEach((selector) => {
        selector.classList.add('animated');
        selector.addEventListener('click', () => {
          this.unactiveSelectors();
          this._filterClass = selector.classList[0];
          selector.classList.add(this._activeClass, 'rubberBand');
          this.showContent();
        });
      });
    }

    unactiveSelectors() {
      this._tabsSelectors.forEach((selector) => {
        selector.classList.remove(this._activeClass, 'rubberBand');
      });
    }

    showContent() {
      let contentCount = 0;
      this._tabsContent.forEach((content) => {
        if (!content.classList.contains(this._filterClass)) {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
          contentCount++;
        }
      });
      if (contentCount === 0) {
        this._plug.style.display = 'block';
        this._tabsContentWrapper.style.display = 'none';
      } else {
        this._plug.style.display = 'none';
        this._tabsContentWrapper.style.display = 'flex';
      }
    }
  }
  // eslint-disable-next-line no-new
  new Tabs(tabsSelectors, tabsContent, activeClass, plugSelector);
};

export default tabs;
