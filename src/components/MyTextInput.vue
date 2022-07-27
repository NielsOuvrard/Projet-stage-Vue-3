<script setup lang="ts">
    import { useI18n } from 'vue-i18n'
    import { Field, useField } from 'vee-validate'
    import { Rules } from '../types/rulesType'

    interface Props {
        name: string
        type: string
        rules: Rules
    }

    const props = defineProps<Props>()
    const { t } = useI18n()
    const { errorMessage } = useField(props.name, props.rules)
</script>

<template>
    <div class="input">
        <label>{{ t(`signUp.${name}`) }}</label>
        <Field
            :type="type"
            :name="name"
            :placeholder="`${t(`signUp.${name}`)}`"
            :rules="rules"
            class="input__field"
        >
        </Field>
        <span class="input__error">{{ errorMessage }}</span>
    </div>
</template>

<style lang="scss" scoped>
    .input {
        display: flex;
        flex-direction: column;
        margin: 0.5em 0;

        &__field {
            width: 13em;
            padding: 0.6em;
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

        &__error {
            font-size: 15px;
            color: red;
        }
    }

    @media (min-width: 720px) {
        .input {
            &__field {
                width: 17em;
            }
        }
    }
</style>
