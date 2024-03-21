import { h } from 'vue'

const arrayImage: string[] = ['vkontakte', 'facebook', 'instagram', 'youtybe']

export default (props: any) => {
    return h('ul', {
        class: 'flex gap-2'
    }, arrayImage.map(el => {
        return h('li', { class: 'pointer'},[h(
          'img', { src: `/img/iconSocials/${el}.png`, alt: el }
          )]
        )
    }))
}
