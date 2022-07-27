<script setup lang="ts">
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { Field, ErrorMessage } from 'vee-validate'

    interface Props {
        register: boolean
    }

    defineProps<Props>()

    const showPassword = ref(false)

    const { t } = useI18n()
    const imgShow =
        'https://icon-library.com/images/show-password-icon/show-password-icon-3.jpg'
    const imgHide = 'http://cdn.onlinewebfonts.com/svg/img_359124.png'
</script>

<template>
    <div class="input">
        <div class="input__password">
            <label>{{ t('signUp.password') }}</label>
            <Field
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :placeholder="`${t(`signUp.password`)}`"
                :rules="{ min: 8, required: true }"
                class="input__password__field"
            >
            </Field>
            <ErrorMessage name="password" class="input-error" />
        </div>
        <div v-if="register" class="input__password">
            <label>{{ t(`signUp.confirmPassword`) }}</label>
            <Field
                :type="showPassword ? 'text' : 'password'"
                name="confirm"
                :placeholder="`${t(`signUp.confirmPassword`)}`"
                rules="confirmed:@password"
                class="input__password__field"
            >
            </Field>
            <ErrorMessage name="confirm" class="input-error" />
        </div>
        <button
            type="button"
            class="input__show-password"
            @click="showPassword = !showPassword"
        >
            <img
                class="input__show-password__img"
                :src="showPassword ? imgShow : imgHide"
            />
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .input {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__password {
            display: flex;
            flex-direction: column;
            margin: 0.5em 0;

            &__field {
                padding: 0.6em;
                width: 13em;
                border-radius: 4px;
                margin-top: 0.4em;
                border: none;
                background-color: rgba(255, 255, 255, 0.07);
                color: white;
                outline-style: none;
                &::placeholder {
                    color: #e5e5e5;
                }
            }
        }

        &__error {
            font-size: 15px;
            color: red;
        }

        &__show-password {
            border: none;
            outline: none;
            height: 1.1em;
            width: 2em;
            border-radius: 2px;
            margin-bottom: 1em;
            &__img {
                width: 1em;
                height: 1em;
            }
        }
    }

    @media (min-width: 720px) {
        .input {
            &__password {
                &__field {
                    width: 17em;
                }
            }
        }
    }
</style>

<!--

-->
