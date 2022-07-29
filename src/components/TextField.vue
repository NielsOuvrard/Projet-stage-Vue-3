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
    const { t } = useI18n({ useScope: 'global' })
    const { errorMessage } = useField(props.name, props.rules)
</script>

<template>
    <div class="input">
        <label>{{ t(`signUp.${name}`) }}</label>
        <Field
            :type="type"
            :name="name"
            :placeholder="t(`signUp.${name}`)"
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
            padding: 0.6em;
            border-radius: 0.25em;
            margin-top: 0.4em;
            border: none;
            max-width: fit-content;
            background-color: rgba(255, 255, 255, 0.07);
            color: white;
            outline-style: none;

            @media (min-width: 45em) {
                max-width: none;
                width: 17em;
            }

            &::placeholder {
                color: #e5e5e5;
            }
        }

        &__error {
            font-size: 0.75em;
            color: red;
        }
    }

    @media (min-width: 45em) {
        .input {
            &__field {
                width: 17em;
            }
        }
    }
</style>
