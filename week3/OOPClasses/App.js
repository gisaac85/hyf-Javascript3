/* global View, Repository, Contributor */
/* eslint-disable no-unused-vars */
'use strict'; {

    class App extends View {

        async start() {
            try {
                const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
                const root = document.getElementById('root');

                this.createAndAppend('h1', root, {
                    html: 'HYF SPA <br> BY <br> >> OOP ES6 Classes <<'
                });

                const header = this.createAndAppend('div', root, {
                    id: 'header'
                });
                this.createAndAppend('label', header, {
                    html: 'Select a Repository:'
                });

                const container = this.createAndAppend('div', root, {
                    class: 'container',
                    id: 'container'
                });

                const informationDiv = this.createAndAppend('div', container, {
                    class: 'infoDiv'
                });
                this.createAndAppend('ul', informationDiv, {
                    id: 'info'
                });

                const imagesDiv = this.createAndAppend('div', container, {
                    class: 'imgDiv'
                });
                this.createAndAppend('ul', imagesDiv, {
                    id: 'imgUl'
                });

                const data = await this.fetchJSON(url);
                this.manipulateSelect(data);
            } catch (err) {
                document.getElementById('container').innerHTML = err.message;
            }
        }

        manipulateSelect(repos) {

            repos.sort((a, b) => a.name.localeCompare(b.name));

            const select = this.createAndAppend('select', document.getElementById('header'));

            this.createAndAppend('option', select, {

                html: 'Select Repo',

            });

            this.createAndAppend('optgroup', select, {
                label: '--------------------------------'
            });

            repos.forEach((repo, i) => {
                this.createAndAppend('option', select, {
                    html: repos[i].name,
                    value: i
                });
            });

            select.addEventListener('change', () => {
                const index = select.selectedIndex;
                if (index > 0) {
                    const repo = new Repository(repos[select.value]);
                    repo.render();
                    repo.fetchContributors(repos[select.value])
                        .then(contributors => {
                            const contributor = new Contributor(contributors);
                            contributor.render();
                        });

                } else {
                    const ulInfo = document.getElementById('info');
                    ulInfo.innerHTML = '';
                    const ulImg = document.getElementById('imgUl');
                    ulImg.innerHTML = '';
                }

            });

        }

    }

    window.onload = () => {
        const app = new App();
        app.start();
    };
}