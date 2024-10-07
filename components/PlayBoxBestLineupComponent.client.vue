<template>
    <div class="playBox">
        <div class='play'>
            <span class="new">
                <div class="playerevent">
                    <div class="team">
                        <BaseImage
                            :src="'https://img.sportdb.live/livescore-img' +  (props?.player?.team?.national == 1 ? `/team/${props?.player?.team?.country_logo_o}!h50` : `/team/${props?.player?.team?.logo_o}!h50`)"
                            :alt="props?.player?.team?.name"/>
                    </div>

                    <div class="player-init">
                        <BaseImage class="player" :id="'playimg_' + props?.player?.player.id"
                            :src="props?.player?.player?.logo_o ? 'https://img.sportdb.live/livescore-img/player/' + props?.player?.player?.logo_o  + '!h100': '/img/user.png'"
                            :alt="props?.player?.player?.name"/>
                    </div>

                    <div class="events">
                        <i class="sr icon RB" v-if="props?.player?.rating">{{ (props?.player?.rating / 100).toFixed(1) }}</i>
                    </div>
                </div>
                <div class='name'>
                    <span><nuxt-link :to="ROUTERS_OLD.PLAYER + props?.player?.player?.id">{{ props?.player?.player?.name }}</nuxt-link></span>
                </div>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    player: any | []
}>()

</script>
<style scoped lang="scss">
ul {
    height: 130px
}
.playerevent {
    display: flex !important;
    justify-content: center !important;
    .team {
        width: 25px;
        position: absolute;
        bottom: 0;
        left: -1px;
        box-shadow: none;
        @media (max-width: 975px) {
            display: none !important;
        }
    }
    .player-init {
        width: 50px;
        @media (max-width: 975px) {
            display: none !important;
        }
    }
    .player {
        background: white;
        padding: 1px;
        @media (max-width: 975px) {
            display: none !important;
        }
    }
}
</style>