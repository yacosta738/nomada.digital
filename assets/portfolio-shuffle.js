import Shuffle from 'shufflejs';

class Demo {
    constructor(element) {
        this.element = element;
        this.shuffle = new Shuffle(element, {
            itemSelector: '.shuffle-item',
            isCentered: true,
            sizer: element.querySelector('.my-sizer-element') });


        // Log events.
        this.addShuffleEventListeners();
        this._activeFilters = [];
        this.addFilterButtons();
        this.addSorting();
        this.addSearchFilter();
    }

    /**
     * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
     * for them like you normally would (with jQuery for example).
     */
    addShuffleEventListeners() {
        this.shuffle.on(Shuffle.EventType.LAYOUT, data => {
            console.log('layout. data:', data);
        });
        this.shuffle.on(Shuffle.EventType.REMOVED, data => {
            console.log('removed. data:', data);
        });
    }

    addFilterButtons() {
        const options = document.querySelector('.filter-options');
        if (!options) {
            return;
        }

        const filterButtons = Array.from(options.children);
        const onClick = this._handleFilterClick.bind(this);
        filterButtons.forEach(button => {
            button.addEventListener('click', onClick, false);
        });
    }

    _handleFilterClick(evt) {
        const btn = evt.currentTarget;
        const isActive = btn.classList.contains('active-filter');
        const btnGroup = btn.getAttribute('data-group');

        this._removeActiveClassFromChildren(btn.parentNode);

        let filterGroup;
        if (isActive) {
            btn.classList.remove('active-filter');
            filterGroup = Shuffle.ALL_ITEMS;
        } else {
            btn.classList.add('active-filter');
            filterGroup = btnGroup;
        }

        this.shuffle.filter(filterGroup);
    }

    _removeActiveClassFromChildren(parent) {
        const { children } = parent;
        for (let i = children.length - 1; i >= 0; i--) {
            children[i].classList.remove('active-filter');
        }
    }

    addSorting() {
        const buttonGroup = document.querySelector('.sort-options');
        if (!buttonGroup) {
            return;
        }
        buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
    }

    _handleSortChange(evt) {
        // Add and remove `active` class from buttons.
        const buttons = Array.from(evt.currentTarget.children);
        buttons.forEach(button => {
            if (button.querySelector('input').value === evt.target.value) {
                button.classList.add('active-filter');
            } else {
                button.classList.remove('active-filter');
            }
        });

        // Create the sort options to give to Shuffle.
        const { value } = evt.target;
        console.log(evt.target);
        console.log(evt.target.value);
        let options = {};

        function sortByDate(element) {
            return element.getAttribute('data-created');
        }

        function sortByTitle(element) {
            return element.getAttribute('data-title').toLowerCase();
        }

        if (value === 'date-created') {
            options = {
                reverse: true,
                by: sortByDate };

        } else if (value === 'title') {
            options = {
                by: sortByTitle };

        }
        console.log(`value => ${value}`);
        console.log(options);
        this.shuffle.sort(options);
    }

    // Advanced filtering
    addSearchFilter() {
        const searchInput = document.querySelector('.js-shuffle-search');
        if (!searchInput) {
            return;
        }
        searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
    }

    /**
     * Filter the shuffle instance by items with a title that matches the search input.
     * @param {Event} evt Event object.
     */
    _handleSearchKeyup(evt) {
        const searchText = evt.target.value.toLowerCase();
        this.shuffle.filter((element, shuffle) => {
            // If there is a current filter applied, ignore elements that don't match it.
            if (shuffle.group !== Shuffle.ALL_ITEMS) {
                // Get the item's groups.
                const groups = JSON.parse(element.getAttribute('data-groups'));
                const isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
                // Only search elements in the current group
                if (!isElementInCurrentGroup) {
                    return false;
                }
            }
            const titleElement = element.querySelector('.project-title ');
            const titleText = titleElement.textContent.toLowerCase().trim();
            return titleText.indexOf(searchText) !== -1;
        });
    }}


document.addEventListener('DOMContentLoaded', () => {
    window.demo = new Demo(document.getElementById('portfolio-grid'));
});