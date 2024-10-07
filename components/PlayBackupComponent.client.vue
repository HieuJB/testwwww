<template>
    <div class="play">
        <span class="new">
            <div class="playerevent">
            <div class="number">{{ player.shirt_number }}</div>
            <div class="events">
                <BaseImage v-for="(incident, index) in player.incidents" :key="incident.time"
                    :alt="getIncidentAlt(incident.type)"
                    :src="getIncidentImage(incident.type)"
                    :class="getClassImage(index + 1)"/>
                <i class="sr icon RB" v-if="parseFloat(player.rating) !== 0.0">{{ player.rating }}</i>
            </div>
            </div>
            <div class="name">
                <span>{{ player.name }}</span>
            </div>
            <ul>
                <li class="icon">
                    <BaseImage :id="'playimg_' + player.id"
                        :src="player.logo_o ? 'https://img.sportdb.live/livescore-img/player/' + player.logo_o + '!h100' : '/img/user.png'"
                        :alt="player.name"/>
                </li>
                <li>
                    <b>{{ $t('Name') }}: </b>{{ player.name }}
                </li>
                <li>
                    <b>{{ $t('Date of birth') }}: </b>{{ player.birthday ? formatDate(player.birthday) : '...' }}
                </li>
                <li>
                    <b>{{ $t('Height') }}: </b>{{ player.height ? player.height + ' ' + $t('CM') : '...' }}
                </li>
                <li>
                    <b>{{ $t('Value') }}: </b>£{{ player.market_value ? formatMarketValue(player.market_value) + ' ' + $t('Million') : '...' }}
                </li>
                <li>
                    <b>{{ $t('Nationality') }}: </b>{{ player.country_name || '...' }}
                </li>
            </ul>
        </span>
    </div>
</template>

<script setup lang="ts">
const { useLocale, $t, $trouter } = useShareCommon()

const props = defineProps<{
    player: any | undefined,
}>()

const incidentImages = {
    1: '1.png', 
    2: '2.png',  
    3: '3.png',  
    4: '4.png',  
    5: '5.png',  
    6: '6.png',  
    7: '7.png',  
    8: '8.png',  
    9: '9.2.png',  
    11: '11.png', 
    12: '12.png',
    15: '15.png',  
    16: '16.png',  
    17: '17.png',  
    28: '28.png', 
    29: '8.png',  
    30: '30.png', 
    31: '31.png', 
    32: '32.png', 
    33: '33.png', 
    34: '34.png', 
    36: '36.png', 
    37: '37.png', 
    55: '55.png', 
}

const getIncidentImage = (type) => {
    const baseUrl = `/img/incident/`;
    return baseUrl + (incidentImages[type] ?? '');
}

const getIncidentAlt = (type) => {
    const typeDescriptions = {
        1: 'Goal',
        2: 'Corner',
        3: 'Yellow card',
        4: 'Red card',
        5: 'Offside',
        6: 'Free kick',
        7: 'Goal kick',
        8: 'Penalty',
        9: 'Substitution',
        28: 'VAR',
        17: 'Own goal',
        29: 'Shots on target',  
        30: 'Shots off target',  
    };
    return typeDescriptions[type] || 'Unknown';
}

const  getClassImage = (index) => {
    const indexClassMap = {
        1: 'icon LT',
        2: 'icon LD',
        3: 'icon TL',
        4: 'icon TR',
        5: 'icon RD',
    };
    return indexClassMap[index] || '';
}
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
}
const formatMarketValue = (value) => {
    return (value / 1000000).toFixed(2);
}
</script>