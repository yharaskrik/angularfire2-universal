var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestBed, inject } from '@angular/core/testing';
import { PlatformRef, NgModule, CompilerFactory } from '@angular/core';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { COMMON_CONFIG } from './test-config';
import { BrowserModule } from '@angular/platform-browser';
describe('angularfire', function () {
    var subscription;
    var app;
    var rootRef;
    var questionsRef;
    var listOfQuestionsRef;
    var defaultPlatform;
    var APP_NAME = 'super-awesome-test-firebase-app-name';
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [AngularFireModule.initializeApp(COMMON_CONFIG, APP_NAME)]
        });
        inject([FirebaseApp, PlatformRef], function (_app, _platform) {
            app = _app;
            rootRef = app.database().ref();
            questionsRef = rootRef.child('questions');
            listOfQuestionsRef = rootRef.child('list-of-questions');
            defaultPlatform = _platform;
        })();
    });
    afterEach(function (done) {
        rootRef.remove();
        if (subscription && !subscription.closed) {
            subscription.unsubscribe();
        }
        app.delete().then(done, done.fail);
    });
    describe('FirebaseApp', function () {
        it('should provide a FirebaseApp for the FirebaseApp binding', function () {
            expect(typeof app.delete).toBe('function');
        });
        it('should have the provided name', function () {
            expect(app.name).toBe(APP_NAME);
        });
        it('should use an already intialized firebase app if it exists', function (done) {
            var MyModule = (function () {
                function MyModule() {
                }
                MyModule.prototype.ngDoBootstrap = function () { };
                MyModule = __decorate([
                    NgModule({
                        imports: [
                            AngularFireModule.initializeApp(COMMON_CONFIG, APP_NAME),
                            BrowserModule
                        ]
                    })
                ], MyModule);
                return MyModule;
            }());
            var compilerFactory = defaultPlatform.injector.get(CompilerFactory, null);
            var moduleFactory = compilerFactory.createCompiler().compileModuleSync(MyModule);
            defaultPlatform.bootstrapModuleFactory(moduleFactory)
                .then(function (moduleRef) {
                var ref = moduleRef.injector.get(FirebaseApp);
                expect(ref.name).toEqual(app.name);
            }).then(done, function (e) {
                fail(e);
                done();
            });
        });
    });
});
//# sourceMappingURL=angularfire2.spec.js.map