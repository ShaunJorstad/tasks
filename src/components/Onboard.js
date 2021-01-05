import React from 'react';
import { signInWithGoogle, signUpWithEmail, signInWithEmail } from '../FirebaseConfig';
import InputField from './InputField.js'
import GoogleIcon from '../icons/google.png'
import GithubIcon from '../icons/github.png'

class Onboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'signup',
            signup: {
                email: '',
                confirmEmail: '',
                password: '',
                confirmPassword: ''
            },
            login: {
                email: '',
                password: ''
            }
        }
        this.editFields = this.editFields.bind(this)
    }

    editFields(page, field, val) {
        let change = {}
        if (page === 'signup') {
            change = this.state.signup
        } else {
            change = this.state.login
        }
        change[field] = val
        if (page === 'signup') {
            this.setState({ signup: change })
        } else {
            this.setState({ login: change })
        }
    }

    renderHeader() {
        return (
            <div className="w-full">
                <p className="pt-10 pb-2 w-full text-center text-64 text-sfBold text-gray">
                    {this.state.page === 'signup' ? 'Sign Up' : 'Log In'}
                </p>
                <p
                    className="w-full text-center text-sfLight text-lg"
                >
                    {this.state.page === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
                    <span
                        className="text-blue select-none cursor-pointer"
                        onClick={() => {
                            let pageChange = this.state.page
                            if (pageChange === 'signup') {
                                this.setState({ page: 'login' })
                            } else {
                                this.setState({ page: 'signup' })
                            }
                        }
                        }
                    >
                        {this.state.page === 'signup' ? 'Log in' : "Sign up"}
                    </span>
                </p>
            </div>
        )
    }

    renderSignUpFields() {
        return (
            <div className="grid grid-cols-1 gap-y-8">
                <InputField
                    page={this.state.page}
                    field="email"
                    type="text"
                    data={this.state.signup}
                    editFields={this.editFields}
                />
                <InputField
                    page={this.state.page}
                    field="confirmEmail"
                    type="text"
                    data={this.state.signup}
                    editFields={this.editFields}
                />
                <InputField
                    page={this.state.page}
                    field="password"
                    type="password"
                    data={this.state.signup}
                    editFields={this.editFields}
                />
                <InputField
                    page={this.state.page}
                    field="confirmPassword"
                    type="password"
                    data={this.state.signup}
                    editFields={this.editFields}
                />
                <div>
                    <div
                        className={`border-1 border-blue rounded-lg px-4 py-3 select-none cursor-pointer w-2/6
                            text-blue transition-all duration-200 ease-in-out text-19
                            hover:bg-blue hover:text-white transform hover:scale-90 motion-reduce:transform-none
                        `}
                        onClick={() => {
                            if (this.state.signup.email === "") {
                                alert("email cannot be empty")
                            } else if (this.state.signup.email !== this.state.signup.confirmEmail) {
                                alert("emails must match")
                            } else if (this.state.signup.password === "") {
                                alert("password cannot be empty")
                            } else if (this.state.signup.password.length < 7) {
                                alert("password must be at least 7 characters")
                            } else if (this.state.signup.password !== this.state.signup.confirmPassword) {
                                alert("passwords must match")
                            } else {
                                signUpWithEmail(this.state.signup.email, this.state.signup.password)
                            }
                        }}
                    >
                        <p
                            className={`text-center text-sfLight`}
                        >Sign up</p>
                    </div>
                </div>
            </div>
        )
    }

    renderSignInFields() {
        return (
            <div className="grid grid-cols-1 gap-y-8">
                <InputField
                    page={this.state.page}
                    field="email"
                    type="text"
                    data={this.state.login}
                    editFields={this.editFields}
                />
                <InputField
                    page={this.state.page}
                    field="password"
                    type="password"
                    data={this.state.login}
                    editFields={this.editFields}
                />
                <div>
                    <div
                        className={`border-1 border-blue rounded-lg px-4 py-3 select-none cursor-pointer w-2/6
                            text-blue transition-all duration-200 ease-in-out text-19
                            hover:bg-blue hover:text-white transform hover:scale-90 motion-reduce:transform-none
                        `}
                        onClick={() => { signInWithEmail(this.state.login.email, this.state.login.password) }}
                    >
                        <p
                            className={`text-center text-sfLight`}
                        >Log In</p>
                    </div>
                </div>
            </div>
        )
    }

    renderServices() {
        return (
            <div className="grid">
                <div className="place-self-center">
                    <div className={`
                    bg-red text-white wh-service rounded-lg center-self grid grid-cols-5 select-none cursor-pointer border-2 border-red mb-6
                    hover:bg-white transition-all duration-200 ease-in-out hover:text-red 
                    transform hover:scale-95 motion-reduce:transform-none
                `}
                        onClick={() => { signInWithGoogle() }}
                    >
                        <img src={GoogleIcon} alt="sign in with google" className="place-self-center wh-icon" />
                        <p className="col-span-4 place-self-center ">
                            Sign in with Google
                    </p>
                    </div>
                    <div className={`
                    bg-gray text-white wh-service rounded-lg center-self grid grid-cols-5 select-none cursor-pointer border-2 border-gray
                    hover:bg-white transition-all duration-200 ease-in-out hover:text-gray 
                    transform hover:scale-95 motion-reduce:transform-none
                `}
                        onClick={() => { alert('Github integration coming soon') }}
                    >
                        <img src={GithubIcon} alt="sign in with google" className="bg-gray p-1 rounded-3xl place-self-center wh-icon" />
                        <p className="col-span-4 place-self-center ">
                            Sign in with Github
                    </p>
                    </div>
                </div>

            </div>
        )
    }

    renderBody() {
        return (
            <div
                className={`mt-8 w-4/6 center-self grid grid-cols-2 gridBack gap-x-8`}
            >
                {this.state.page === 'signup' ? this.renderSignUpFields() : this.renderSignInFields()}
                {this.renderServices()}
            </div>
        )
    }

    renderFooter() {
        return (
            <div className="text-center mt-8 text-gray text-sfLight">
                <p>
                    *By signing up, you agree to our <a className="text-blue" href="https://github.com/ShaunJorstad/tasks">Terms of Use</a> and aknowledge our <a className="text-blue" href="https://github.com/ShaunJorstad/tasks">Privacy Policy</a>
                </p>
                <p>Learn about this app and view the source code on <a className="text-blue" href="https://github.com/ShaunJorstad/tasks">Github</a></p>
                <p>Buy the developers a coffee  <a href="https://paypal.me/ShaunJorstad?locale.x=en_US" className="text-blue">{'<3'}</a></p>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </div>
        );
    }
}

export default Onboard;