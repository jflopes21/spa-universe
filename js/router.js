export class Router {
  routes = {};
  app = document.querySelector("#app");

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);

    const links = document.querySelectorAll("nav a");
    links.forEach((link) => {
      link.classList.remove("a-active");
    });

    const clickedLink = event.target;
    clickedLink.classList.add("a-active");

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        app.innerHTML = html;
        if (
          route == "/pages/universe.html" ||
          route == "/pages/exploration.html"
        ) {
          app.classList.remove("app-home");
          app.classList.add("app-default");
        } else {
          app.classList.remove("app-default");
          app.classList.add("app-home");
        }
        if (route == "/pages/universe.html") {
          const links = document.querySelectorAll("nav a");
          links.forEach((link) => {
            link.classList.remove("a-active");
          });
          document.querySelector("#universe").classList.add("a-active");
        }
      });
  }
}
