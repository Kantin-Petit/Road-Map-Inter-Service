'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminModule-56a4ae05b624a6a96cf2d5b8611e5053912e224f5f935e7f49eaac7fdf940d036e86e644c7979d5b15b2aaecc8b40918c4bf860502142ace230e9afcf3b9a56f"' : 'data-bs-target="#xs-components-links-module-AdminModule-56a4ae05b624a6a96cf2d5b8611e5053912e224f5f935e7f49eaac7fdf940d036e86e644c7979d5b15b2aaecc8b40918c4bf860502142ace230e9afcf3b9a56f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-56a4ae05b624a6a96cf2d5b8611e5053912e224f5f935e7f49eaac7fdf940d036e86e644c7979d5b15b2aaecc8b40918c4bf860502142ace230e9afcf3b9a56f"' :
                                            'id="xs-components-links-module-AdminModule-56a4ae05b624a6a96cf2d5b8611e5053912e224f5f935e7f49eaac7fdf940d036e86e644c7979d5b15b2aaecc8b40918c4bf860502142ace230e9afcf3b9a56f"' }>
                                            <li class="link">
                                                <a href="components/AheaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AheaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidemenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidemenuComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-25060f5f41327f1d92487feff8517e552a6cd8e8dfc0ade17761cebae1faf72c24567b49339f30977df3a90083e7b141f7f1571069844b9b11131db169b99abc"' : 'data-bs-target="#xs-components-links-module-AppModule-25060f5f41327f1d92487feff8517e552a6cd8e8dfc0ade17761cebae1faf72c24567b49339f30977df3a90083e7b141f7f1571069844b9b11131db169b99abc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-25060f5f41327f1d92487feff8517e552a6cd8e8dfc0ade17761cebae1faf72c24567b49339f30977df3a90083e7b141f7f1571069844b9b11131db169b99abc"' :
                                            'id="xs-components-links-module-AppModule-25060f5f41327f1d92487feff8517e552a6cd8e8dfc0ade17761cebae1faf72c24567b49339f30977df3a90083e7b141f7f1571069844b9b11131db169b99abc"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-819285d60e6775a33e09205756d424f3e0543d466e565a1c5007003467baa7986c392eb977ae429e1bac9f4f60a2780effb427a4f099e22cf40ddae9f9e4b068"' : 'data-bs-target="#xs-components-links-module-AuthModule-819285d60e6775a33e09205756d424f3e0543d466e565a1c5007003467baa7986c392eb977ae429e1bac9f4f60a2780effb427a4f099e22cf40ddae9f9e4b068"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-819285d60e6775a33e09205756d424f3e0543d466e565a1c5007003467baa7986c392eb977ae429e1bac9f4f60a2780effb427a4f099e22cf40ddae9f9e4b068"' :
                                            'id="xs-components-links-module-AuthModule-819285d60e6775a33e09205756d424f3e0543d466e565a1c5007003467baa7986c392eb977ae429e1bac9f4f60a2780effb427a4f099e22cf40ddae9f9e4b068"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicModule.html" data-type="entity-link" >PublicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PublicModule-3336a5e1cbe0d7baf61526ce8cbb52e1cacb90c89764a0e4bf77d72a0b6c34e6ff29953a83115ee226f65f581497b7b845e6dbe3b866be552613fbb60521a9c7"' : 'data-bs-target="#xs-components-links-module-PublicModule-3336a5e1cbe0d7baf61526ce8cbb52e1cacb90c89764a0e4bf77d72a0b6c34e6ff29953a83115ee226f65f581497b7b845e6dbe3b866be552613fbb60521a9c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-3336a5e1cbe0d7baf61526ce8cbb52e1cacb90c89764a0e4bf77d72a0b6c34e6ff29953a83115ee226f65f581497b7b845e6dbe3b866be552613fbb60521a9c7"' :
                                            'id="xs-components-links-module-PublicModule-3336a5e1cbe0d7baf61526ce8cbb52e1cacb90c89764a0e4bf77d72a0b6c34e6ff29953a83115ee226f65f581497b7b845e6dbe3b866be552613fbb60521a9c7"' }>
                                            <li class="link">
                                                <a href="components/PheaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PheaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PlayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimelineCommunicationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimelineCommunicationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimelinePlanningComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimelinePlanningComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PublicRoutingModule.html" data-type="entity-link" >PublicRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ServiceModule.html" data-type="entity-link" >ServiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ServiceModule-296e296d755106b06b196b28871e169aa1001fc6112b275d28fa6169e744f82399e745c2c1f40219dbc03511ad971985146743a480011f7b19c678355d73248f"' : 'data-bs-target="#xs-components-links-module-ServiceModule-296e296d755106b06b196b28871e169aa1001fc6112b275d28fa6169e744f82399e745c2c1f40219dbc03511ad971985146743a480011f7b19c678355d73248f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ServiceModule-296e296d755106b06b196b28871e169aa1001fc6112b275d28fa6169e744f82399e745c2c1f40219dbc03511ad971985146743a480011f7b19c678355d73248f"' :
                                            'id="xs-components-links-module-ServiceModule-296e296d755106b06b196b28871e169aa1001fc6112b275d28fa6169e744f82399e745c2c1f40219dbc03511ad971985146743a480011f7b19c678355d73248f"' }>
                                            <li class="link">
                                                <a href="components/SaddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SdeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SdeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SeditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SindexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SindexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServiceRoutingModule.html" data-type="entity-link" >ServiceRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModule-936eba796b82e707e4d9a2abc913e9282e5796f8b8074464988f7c2614ed2b17057802279222417087234a13e9e57f8fa48c2bea6c9bbacc16d800084cbd1c05"' : 'data-bs-target="#xs-components-links-module-UserModule-936eba796b82e707e4d9a2abc913e9282e5796f8b8074464988f7c2614ed2b17057802279222417087234a13e9e57f8fa48c2bea6c9bbacc16d800084cbd1c05"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-936eba796b82e707e4d9a2abc913e9282e5796f8b8074464988f7c2614ed2b17057802279222417087234a13e9e57f8fa48c2bea6c9bbacc16d800084cbd1c05"' :
                                            'id="xs-components-links-module-UserModule-936eba796b82e707e4d9a2abc913e9282e5796f8b8074464988f7c2614ed2b17057802279222417087234a13e9e57f8fa48c2bea6c9bbacc16d800084cbd1c05"' }>
                                            <li class="link">
                                                <a href="components/UaddComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UaddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UdeleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UdeleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UeditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UeditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UindexComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UindexComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link" >UserRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});