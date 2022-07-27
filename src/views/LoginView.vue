<script setup lang="ts">
    // import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useForm } from 'vee-validate'
    import MyTextInput from '../components/MyTextInput.vue'
    import MyPasswordInputVue from '../components/MyPasswordInput .vue'

    const { t } = useI18n()
    const { handleSubmit } = useForm()
    const onSubmit = handleSubmit((values, actions) => {
        alert(JSON.stringify(values, null, 2))
        actions.resetForm()
    })
</script>

<template>
    <div class="login">
        <form class="login__form" @submit="onSubmit">
            <h1 class="login__form__title">{{ t('login') }}</h1>
            <MyTextInput
                name="email"
                type="email"
                :rules="{ email: true, required: true }"
            />
            <MyPasswordInputVue :register="false" />
            <button class="login__form__button" type="submit">
                {{ t('signUp.name') }}
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
    .login {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &__form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 1em;
            margin-top: 0.5em;
            width: 15em;
            height: 20em;
            color: white;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);

            &__title {
                margin: 0.1em;
            }

            &__button {
                width: 120px;
                font-size: 16px;
                font-weight: 600;
                color: #fff;
                cursor: pointer;
                margin: 10px;
                height: 45px;
                text-align: center;
                border: none;
                background-size: 300% 100%;
                border-radius: 50px;
                transition: all 0.4s ease-in-out;
                background-image: linear-gradient(
                    to right,
                    #25aae1,
                    #4481eb,
                    #04befe,
                    #3f86ed
                );
                box-shadow: 0 4px 15px 0 rgba(65, 132, 234, 0.75);
            }

            &__button:hover {
                background-position: 100% 0;
                transition: all 0.4s ease-in-out;
            }

            &__button:hover:focus {
                outline: none;
            }
        }
    }

    @media (min-width: 720px) {
        .login {
            &__form {
                margin-top: 4em;
                width: 20em;
                height: 19em;
            }
        }
    }
</style>
