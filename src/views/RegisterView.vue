<script setup lang="ts">
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useForm } from 'vee-validate'
    import MyTextInput from '../components/TextField.vue'
    import MyPasswordInput from '../components/PasswordField.vue'
    import { userStore } from '../store/userStore'
    import { useRouter } from 'vue-router'

    const passwordType = ref('password')
    const eyeClass = ref('fa fa-eye')

    const { t } = useI18n({ useScope: 'global' })
    const { handleSubmit } = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })
    const router = useRouter()
    const store = userStore()

    const onSubmit = handleSubmit((newUser) => {
        const emailAlreadyInUse = store.users?.find((user) => {
            return user.email === newUser.email.trim()
        })
        if (!emailAlreadyInUse) {
            newUser.email = newUser.email.trim()
            store.setNewUser(newUser)
            router.push('/login')
            alert(t('accountCreated'))
        } else {
            alert(t('emailInUse'))
        }
    })

    function showPassword() {
        if (passwordType.value === 'password') {
            passwordType.value = 'text'
            eyeClass.value = 'fa fa-eye-slash'
        } else {
            passwordType.value = 'password'
            eyeClass.value = 'fa fa-eye'
        }
    }
</script>

<template>
    <div class="register">
        <form class="register__form" @submit="onSubmit">
            <h2 class="register__title">{{ t('register') }}</h2>
            <MyTextInput
                name="firstName"
                type="text"
                :rules="{ alpha: true, required: true }"
            />
            <MyTextInput
                name="lastName"
                type="text"
                :rules="{ alpha: true, required: true }"
            />
            <MyTextInput
                name="email"
                type="email"
                :rules="{ email: true, required: true }"
            />
            <MyPasswordInput
                name="password"
                :type="passwordType"
                :rules="{ min: 8, required: true }"
            ></MyPasswordInput>
            <MyPasswordInput
                name="confirmPassword"
                :type="passwordType"
                :rules="{ confirmed: '@password' }"
            />
            <button type="button" @click="showPassword">
                <i :class="eyeClass" aria-hidden="true" />
            </button>
            <button class="register__validate" type="submit">
                {{ t('signUp.name') }}
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
    .register {
        display: flex;
        justify-content: center;
        background-image: url('https://images.unsplash.com/photo-1505775561242-727b7fba20f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 100vh;

        &__form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 1em;
            margin-top: 2em;
            width: 15em;
            height: 33.9em;
            color: white;
            border-radius: 0.625em;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(1.5em);
            border: 0.125em solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 2.5em rgba(8, 7, 16, 0.6);

            @media (min-width: 45em) {
                flex-wrap: wrap;
                flex-direction: row;
                margin-top: 4em;
                width: 25em;
                height: 30em;
            }
        }

        &__title {
            margin: 0.1em;
        }

        &__validate {
            width: 7.5em;
            font-size: 1em;
            font-weight: 600;
            color: #fff;
            cursor: pointer;
            margin: 0.625em;
            height: 2.8125em;
            text-align: center;
            border: none;
            background-size: 300% 100%;
            border-radius: 3.125em;
            transition: all 0.4s ease-in-out;
            background-image: linear-gradient(
                to right,
                #25aae1,
                #4481eb,
                #04befe,
                #3f86ed
            );
            box-shadow: 0 0.25em 0.9375em 0 rgba(65, 132, 234, 0.75);
        }

        &__validate:hover {
            background-position: 100% 0;
            transition: all 0.4s ease-in-out;
        }

        &__validate:hover:focus {
            outline: none;
        }
    }
</style>
