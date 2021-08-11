/*  Melvor Idle Combat Simulator

    Modified Copyright (C) <2020, 2021> <G. Miclotte>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(() => {

    const reqs = [
        'util',
    ];

    const setup = () => {

        const MICSR = window.MICSR;

        /**
         * class ShowModifiers is copied from Melvor Show Modifiers v0.1.1, latest version can be found at:
         * https://raw.githubusercontent.com/gmiclotte/melvor-scripts/master/Show-Modifiers/Show-Modifiers.js
         * TODO: instead of copying it, pull it as a required file or something? No idea how to go about that.
         */
        // start of ShowModifiers copy
        MICSR.ShowModifiers = class {

            constructor(name, logName) {
                this.name = name;
                this.logName = logName;
                // increased - decreased
                this.creasedModifiers = {
                    // modifiers that do not directly relate to skilling
                    misc: {
                        BankSpace: 0,
                        BankSpaceShop: 0,
                    },
                    // modifiers that relate to both combat and non-combat skilling
                    skilling: {
                        ChanceToPreservePotionCharge: 0,
                        ChanceToDoubleItemsGlobal: 0,
                        GPFromSales: 0,
                        GPGlobal: 0,
                        GlobalSkillXP: 0,
                        HiddenSkillLevel: [],
                        PotionChargesFlat: 0,
                        SkillXP: [],
                        SummoningChargePreservation: 0,
                    },
                    // modifiers that only relate to combat and are not classified in a finer group
                    combat: {
                        AttackRolls: 0,
                        ChanceToDoubleLootCombat: 0,
                        DamageToAllMonsters: 0,
                        DamageToBosses: 0,
                        DamageToCombatAreaMonsters: 0,
                        DamageToDungeonMonsters: 0,
                        GPFromMonsters: 0,
                        GPFromMonstersFlat: 0,
                        GlobalAccuracy: 0,
                        MaxHitFlat: 0,
                        MaxHitPercent: 0,
                        MaxHitpoints: 0,
                        MinHitBasedOnMaxHit: 0,
                        MonsterRespawnTimer: 0,
                        AttackInterval: 0,
                        AttackIntervalPercent: 0,
                        ChanceToApplyBurn: 0,
                        GPOnEnemyHit: 0,
                        BleedLifesteal: 0,
                        BurnLifesteal: 0,
                        PoisonLifesteal: 0,
                        FlatMinHit: 0,
                        DamageTaken: 0,
                        GlobalEvasion: 0,
                    },
                    // modifiers that relate to healing
                    hitpoints: {
                        AutoEatEfficiency: 0,
                        AutoEatHPLimit: 0,
                        AutoEatThreshold: 0,
                        FoodHealingValue: 0,
                        HPRegenFlat: 0,
                        HitpointRegeneration: 0,
                        Lifesteal: 0,
                        FlatMaxHitpoints: 0,
                    },
                    // modifiers that relate to defence
                    defence: {
                        DamageReduction: 0,
                        MagicEvasion: 0,
                        MeleeEvasion: 0,
                        RangedEvasion: 0,
                        ReflectDamage: 0,
                        FlatReflectDamage: 0,
                        RolledReflectDamage: 0,
                        DamageReductionPercent: 0,
                    },
                    // modifiers that relate to using melee attacks
                    melee: {
                        MeleeAccuracyBonus: 0,
                        MeleeStrengthBonus: 0,
                        MeleeMaxHit: 0,
                        MeleeLifesteal: 0,
                        MeleeCritChance: 0,
                        MeleeCritMult: 0,
                    },
                    // modifiers that relate to using ranged attacks
                    ranged: {
                        AmmoPreservation: 0,
                        RangedAccuracyBonus: 0,
                        RangedStrengthBonus: 0,
                        RangedMaxHit: 0,
                        RangedLifesteal: 0,
                        RangedCritChance: 0,
                        RangedCritMult: 0,
                    },
                    // modifiers that relate to using magic attacks
                    magic: {
                        MagicAccuracyBonus: 0,
                        MagicDamageBonus: 0,
                        MinAirSpellDmg: 0,
                        MaxAirSpellDmg: 0,
                        MinEarthSpellDmg: 0,
                        MaxEarthSpellDmg: 0,
                        MinFireSpellDmg: 0,
                        MaxFireSpellDmg: 0,
                        MinWaterSpellDmg: 0,
                        MaxWaterSpellDmg: 0,
                        RunePreservation: 0,
                        MagicMaxHit: 0,
                        MagicLifesteal: 0,
                        MagicCritChance: 0,
                        MagicCritMult: 0,
                        Confusion: 0,
                        Decay: 0,
                    },
                    // modifiers that relate to slayer tasks, areas, or monsters
                    slayer: {
                        DamageToSlayerAreaMonsters: 0,
                        DamageToSlayerTasks: 0,
                        SlayerAreaEffectNegationFlat: 0,
                        SlayerCoins: 0,
                        SlayerTaskLength: 0,
                    },
                    // modifiers that relate to prayer
                    prayer: {
                        ChanceToPreservePrayerPoints: 0,
                        FlatPrayerCostReduction: 0,
                        PrayerCost: 0,
                    },
                    // modifiers that apply to general non-combat skilling
                    nonCombat: {
                        ChanceToDoubleItemsSkill: [],
                        SkillInterval: [],
                        SkillIntervalPercent: [],
                        ChanceAdditionalSkillResource: [],
                    },
                    production: {
                        GlobalPreservationChance: 0,
                        SkillPreservationChance: [],
                    },
                    mastery: {
                        GlobalMasteryXP: 0,
                        MasteryXP: [],
                    },
                    // specific skills
                    agility: {
                        GPFromAgility: 0,
                        AgilityObstacleCost: 0,
                    },
                    altMagic: {
                        AltMagicSkillXP: 0,
                    },
                    farming: {
                        ChanceDoubleHarvest: 0,
                        FarmingYield: 0,
                    },
                    herblore: {
                        ChanceRandomPotionHerblore: 0,
                    },
                    mining: {
                        ChanceNoDamageMining: 0,
                        ChanceToDoubleOres: 0,
                        MiningNodeHP: 0,
                    },
                    runecrafting: {
                        ChanceForElementalRune: 0,
                        ElementalRuneGain: 0,
                        AdditionalRunecraftCountRunes: 0,
                    },
                    smithing: {
                        SeeingGoldChance: 0,
                    },
                    thieving: {
                        ChanceToDoubleLootThieving: 0,
                        GPFromThieving: 0,
                        GPFromThievingFlat: 0,
                    },
                    woodcutting: {
                        BirdNestDropRate: 0,
                    },
                    summoning: {
                        SummoningShardCost: 0,
                        SummoningCreationCharges: 0,
                    },
                    // modifiers that are not actually implemented in the game
                    unimplemented: {
                        MaxStamina: 0,
                        StaminaCost: 0,
                        StaminaPerObstacle: 0,
                        StaminaPreservationChance: 0,
                    },
                }

                this.singletonModifiers = {
                    misc: {
                        autoSlayerUnlocked: 0,
                        dungeonEquipmentSwapping: 0,
                        increasedEquipmentSets: 0,
                    },
                    skilling: {
                        allowSignetDrops: 0,
                        increasedMasteryPoolProgress: 0,
                    },
                    combat: {
                        meleeProtection: 0,
                        rangedProtection: 0,
                        magicProtection: 0,
                        curseImmunity: 0,
                        stunImmunity: 0,
                        sleepImmunity: 0,
                        burnImmunity: 0,
                        poisonImmunity: 0,
                        bleedImmunity: 0,
                        debuffImmunity: 0,
                        increasedRebirthChance: 0,
                        decreasedDragonBreathDamage: 0,
                        increasedMeleeStunThreshold: 0,
                        increasedRuneProvision: 0,
                        increasedChanceToConvertSeedDrops: 0,
                        bonusCoalOnDungeonCompletion: 0,
                        bypassSlayerItems: 0,
                        itemProtection: 0,
                        autoLooting: 0,
                        autoBurying: 0,
                        increasedCombatStoppingThreshold: 0,
                        increasedGPMultiplierPer1MGP: 0,
                        increasedGPMultiplierCap: 0,
                        increasedGPMultiplierMin: 0,
                        allowAttackAugmentingMagic: 0,
                    },
                    prayer: {
                        increasedRedemptionPercent: 0,
                        increasedRedemptionThreshold: 0,
                    },
                    nonCombat: {
                        increasedOffItemChance: 0,
                    },
                    // specific skills
                    cooking: {
                        decreasedFoodBurnChance: 0,
                        decreasedSecondaryFoodBurnChance: 0,
                    },
                    farming: {
                        freeCompost: 0,
                        increasedCompostPreservationChance: 0,
                    },
                    firemaking: {
                        freeBonfires: 0,
                        increasedFiremakingCoalChance: 0,
                    },
                    mining: {
                        increasedMiningGemChance: 0,
                        doubleOresMining: 0,
                        increasedBonusCoalMining: 0,
                    },
                    smithing: {
                        decreasedSmithingCoalCost: 0,
                    },
                    thieving: {
                        increasedThievingSuccessRate: 0,
                        increasedThievingSuccessCap: 0,
                    },
                    woodcutting: {
                        increasedTreeCutLimit: 0,
                    },
                    // golbin raid modifiers
                    golbinRaid: {
                        golbinRaidIncreasedMaximumAmmo: 0,
                        golbinRaidIncreasedMaximumRunes: 0,
                        golbinRaidIncreasedMinimumFood: 0,
                        golbinRaidIncreasedPrayerLevel: 0,
                        golbinRaidIncreasedPrayerPointsStart: 0,
                        golbinRaidIncreasedPrayerPointsWave: 0,
                        golbinRaidIncreasedStartingRuneCount: 0,
                        golbinRaidPassiveSlotUnlocked: 0,
                        golbinRaidPrayerUnlocked: 0,
                        golbinRaidStartingWeapon: 0,
                        golbinRaidWaveSkipCostReduction: 0,
                    },
                    // summoning synergy modifiers, should be moved to the appropriate location, IF they are here to stay
                    summoning: {
                        summoningSynergy_0_1: 0,
                        summoningSynergy_0_6: 0,
                        summoningSynergy_0_7: 0,
                        summoningSynergy_0_8: 0,
                        summoningSynergy_0_12: 0,
                        summoningSynergy_0_13: 0,
                        summoningSynergy_0_14: 0,
                        summoningSynergy_0_15: 0,
                        summoningSynergy_1_2: 0,
                        summoningSynergy_1_8: 0,
                        summoningSynergy_1_12: 0,
                        summoningSynergy_1_13: 0,
                        summoningSynergy_1_14: 0,
                        summoningSynergy_1_15: 0,
                        summoningSynergy_2_6: 0,
                        summoningSynergy_2_7: 0,
                        summoningSynergy_2_8: 0,
                        summoningSynergy_2_12: 0,
                        summoningSynergy_2_13: 0,
                        summoningSynergy_2_14: 0,
                        summoningSynergy_2_15: 0,
                        summoningSynergy_3_4: 0,
                        summoningSynergy_3_5: 0,
                        summoningSynergy_3_9: 0,
                        summoningSynergy_3_10: 0,
                        summoningSynergy_3_11: 0,
                        summoningSynergy_3_16: 0,
                        summoningSynergy_3_17: 0,
                        summoningSynergy_3_18: 0,
                        summoningSynergy_3_19: 0,
                        summoningSynergy_4_5: 0,
                        summoningSynergy_4_9: 0,
                        summoningSynergy_4_10: 0,
                        summoningSynergy_4_11: 0,
                        summoningSynergy_4_16: 0,
                        summoningSynergy_4_17: 0,
                        summoningSynergy_4_18: 0,
                        summoningSynergy_4_19: 0,
                        summoningSynergy_5_9: 0,
                        summoningSynergy_5_10: 0,
                        summoningSynergy_5_11: 0,
                        summoningSynergy_5_16: 0,
                        summoningSynergy_5_17: 0,
                        summoningSynergy_5_18: 0,
                        summoningSynergy_6_7: 0,
                        summoningSynergy_6_8: 0,
                        summoningSynergy_6_12: 0,
                        summoningSynergy_6_13: 0,
                        summoningSynergy_6_14: 0,
                        summoningSynergy_6_15: 0,
                        summoningSynergy_7_8: 0,
                        summoningSynergy_7_12: 0,
                        summoningSynergy_7_13: 0,
                        summoningSynergy_7_14: 0,
                        summoningSynergy_7_15: 0,
                        summoningSynergy_8_12: 0,
                        summoningSynergy_8_13: 0,
                        summoningSynergy_8_14: 0,
                        summoningSynergy_9_10: 0,
                        summoningSynergy_9_11: 0,
                        summoningSynergy_9_16: 0,
                        summoningSynergy_9_17: 0,
                        summoningSynergy_9_18: 0,
                        summoningSynergy_9_19: 0,
                        summoningSynergy_10_11: 0,
                        summoningSynergy_10_16: 0,
                        summoningSynergy_10_17: 0,
                        summoningSynergy_10_18: 0,
                        summoningSynergy_10_19: 0,
                        summoningSynergy_11_16: 0,
                        summoningSynergy_11_17: 0,
                        summoningSynergy_11_18: 0,
                        summoningSynergy_11_19: 0,
                        summoningSynergy_12_13: 0,
                        summoningSynergy_12_14: 0,
                        summoningSynergy_12_15: 0,
                        summoningSynergy_13_14: 0,
                        summoningSynergy_13_15: 0,
                        summoningSynergy_14_15: 0,
                        summoningSynergy_16_17: 0,
                        summoningSynergy_16_18: 0,
                        summoningSynergy_16_19: 0,
                        summoningSynergy_17_18: 0,
                        summoningSynergy_17_19: 0,
                        summoningSynergy_18_19: 0,
                    },
                    aprilFools: {
                        aprilFoolsIncreasedMovementSpeed: 0,
                        aprilFoolsDecreasedMovementSpeed: 0,
                        aprilFoolsIncreasedTeleportCost: 0,
                        aprilFoolsDecreasedTeleportCost: 0,
                        aprilFoolsIncreasedUpdateDelay: 0,
                        aprilFoolsDecreasedUpdateDelay: 0,
                        aprilFoolsIncreasedLemonGang: 0,
                        aprilFoolsDecreasedLemonGang: 0,
                        aprilFoolsIncreasedCarrotGang: 0,
                        aprilFoolsDecreasedCarrotGang: 0,
                    }
                }

                this.knownModifiers = {};
                Object.getOwnPropertyNames(this.creasedModifiers).forEach(subset => {
                    Object.getOwnPropertyNames(this.creasedModifiers[subset]).forEach(modifier => {
                        this.knownModifiers[`increased${modifier}`] = true;
                        this.knownModifiers[`decreased${modifier}`] = true;
                    });
                });
                Object.getOwnPropertyNames(this.singletonModifiers).forEach(subset => {
                    Object.getOwnPropertyNames(this.singletonModifiers[subset]).forEach(modifier => {
                        this.knownModifiers[modifier] = true;
                    });
                });

                // check for unknown modifiers
                let hasUnknownModifiers = false;
                [
                    ...Object.getOwnPropertyNames(player.modifiers),
                    ...player.modifiers.skillModifiers.keys()
                ].forEach(modifier => {
                    if (modifier === 'skillModifiers') {
                        return;
                    }
                    if (this.knownModifiers[modifier]) {
                        return;
                    }
                    hasUnknownModifiers = true;
                    this.log(`unknown modifier ${modifier}`);
                });
                if (!hasUnknownModifiers) {
                    this.log('no unknown modifiers detected!')
                }

                this.relevantModifiers = {};

                // all
                this.relevantModifiers.all = {
                    names: [
                        ...Object.getOwnPropertyNames(this.creasedModifiers).map(tag => this.creasedModifiers[tag]),
                        ...Object.getOwnPropertyNames(this.singletonModifiers).map(tag => this.singletonModifiers[tag]),
                    ],
                    skillIDs: Object.getOwnPropertyNames(SKILLS).map(x => Number(x)),
                };

                // misc
                this.relevantModifiers.misc = {
                    names: [
                        this.creasedModifiers.misc,
                        this.singletonModifiers.misc,
                    ],
                    skillIDs: [],
                };

                // golbin raid
                this.relevantModifiers.golbin = {
                    names: [this.singletonModifiers.golbinRaid],
                    skillIDs: [],
                };

                // all combat
                this.relevantModifiers.combat = {
                    names: [
                        this.creasedModifiers.skilling,
                        this.creasedModifiers.combat,
                        this.creasedModifiers.hitpoints,
                        this.creasedModifiers.defence,
                        this.creasedModifiers.melee,
                        this.creasedModifiers.ranged,
                        this.creasedModifiers.magic,
                        this.creasedModifiers.slayer,
                        this.creasedModifiers.prayer,
                    ],
                    skillIDs: [
                        CONSTANTS.skill.Attack,
                        CONSTANTS.skill.Strength,
                        CONSTANTS.skill.Ranged,
                        CONSTANTS.skill.Magic,
                        CONSTANTS.skill.Defence,
                        CONSTANTS.skill.Hitpoints,
                        CONSTANTS.skill.Prayer,
                        CONSTANTS.skill.Slayer,
                        CONSTANTS.skill.Summoning,
                    ],
                };

                // melee combat
                this.relevantModifiers.melee = {
                    names: [
                        this.creasedModifiers.skilling,
                        this.creasedModifiers.combat,
                        this.creasedModifiers.hitpoints,
                        this.creasedModifiers.defence,
                        this.creasedModifiers.melee,
                        this.creasedModifiers.slayer,
                        this.creasedModifiers.prayer,
                    ],
                    skillIDs: [
                        CONSTANTS.skill.Attack,
                        CONSTANTS.skill.Strength,
                        CONSTANTS.skill.Defence,
                        CONSTANTS.skill.Hitpoints,
                        CONSTANTS.skill.Prayer,
                        CONSTANTS.skill.Slayer,
                        CONSTANTS.skill.Summoning,
                    ],
                };

                // ranged combat
                this.relevantModifiers.ranged = {
                    names: [
                        this.creasedModifiers.skilling,
                        this.creasedModifiers.combat,
                        this.creasedModifiers.hitpoints,
                        this.creasedModifiers.defence,
                        this.creasedModifiers.ranged,
                        this.creasedModifiers.slayer,
                        this.creasedModifiers.prayer,
                    ],
                    skillIDs: [
                        CONSTANTS.skill.Ranged,
                        CONSTANTS.skill.Defence,
                        CONSTANTS.skill.Hitpoints,
                        CONSTANTS.skill.Prayer,
                        CONSTANTS.skill.Slayer,
                        CONSTANTS.skill.Summoning,
                    ],
                };

                // magic combat
                this.relevantModifiers.magic = {
                    names: [
                        this.creasedModifiers.skilling,
                        this.creasedModifiers.combat,
                        this.creasedModifiers.hitpoints,
                        this.creasedModifiers.defence,
                        this.creasedModifiers.magic,
                        this.creasedModifiers.slayer,
                        this.creasedModifiers.prayer,
                    ],
                    skillIDs: [
                        CONSTANTS.skill.Magic,
                        CONSTANTS.skill.Defence,
                        CONSTANTS.skill.Hitpoints,
                        CONSTANTS.skill.Prayer,
                        CONSTANTS.skill.Slayer,
                        CONSTANTS.skill.Summoning,
                    ],
                };

                // slayer
                this.relevantModifiers.slayer = {
                    names: [
                        this.creasedModifiers.skilling,
                        this.creasedModifiers.slayer,
                    ],
                    skillIDs: [
                        CONSTANTS.skill.Slayer,
                    ],
                };

                // gathering skills
                this.gatheringSkills = ['Woodcutting', 'Fishing', 'Mining', 'Thieving', 'Farming', 'Agility'];
                this.gatheringSkills.forEach(name => {
                    this.relevantModifiers[name] = {
                        names: [
                            this.creasedModifiers.skilling,
                            this.creasedModifiers.nonCombat,
                            this.creasedModifiers.mastery,
                        ],
                        skillIDs: [
                            CONSTANTS.skill[name]
                        ],
                    };
                    const lname = name.toLowerCase();
                    if (this.creasedModifiers[lname] !== undefined) {
                        this.relevantModifiers[name].names.push(this.creasedModifiers[lname]);
                    }
                    if (this.singletonModifiers[lname] !== undefined) {
                        this.relevantModifiers[name].names.push(this.singletonModifiers[lname]);
                    }
                });

                // production skills
                this.productionSkills = ['Firemaking', 'Cooking', 'Smithing', 'Fletching', 'Crafting', 'Runecrafting', 'Herblore', 'Summoning'];
                this.productionSkills.forEach(name => {
                    this.relevantModifiers[name] = {
                        names: [
                            this.creasedModifiers.skilling,
                            this.creasedModifiers.nonCombat,
                            this.creasedModifiers.production,
                            this.creasedModifiers.mastery,
                        ],
                        skillIDs: [
                            CONSTANTS.skill[name]
                        ],
                    };
                    const lname = name.toLowerCase();
                    if (this.creasedModifiers[lname] !== undefined) {
                        this.relevantModifiers[name].names.push(this.creasedModifiers[lname]);
                    }
                    if (this.singletonModifiers[lname] !== undefined) {
                        this.relevantModifiers[name].names.push(this.singletonModifiers[lname]);
                    }
                });

                // whatever alt magic is
                this.relevantModifiers.altMagic = {
                    names: [
                        this.creasedModifiers.skilling,
                        this.creasedModifiers.nonCombat,
                        this.creasedModifiers.altMagic,
                    ],
                    skillIDs: [],
                };

                // golbin raid
                this.relevantModifiers.golbinRaid = {
                    names: [this.singletonModifiers.golbinRaid],
                    skillIDs: [],
                };
            }

            log(...args) {
                console.log(`${this.logName}:`, ...args);
            }

            printUniqueModifier(modifier, value) {
                if (!value) {
                    return [];
                }
                return [printPlayerModifier(modifier, value)];
            }

            printDiffModifier(modifier, value, skillID = undefined) {
                // compute difference
                if (!value) {
                    return [];
                }
                // store if value is positive or negative
                const positive = value > 0;
                // take absolute value
                let valueToPrint = positive ? value : -value;
                // convert to array if required
                valueToPrint = skillID !== undefined ? [skillID, valueToPrint] : valueToPrint;
                // print increased or decreased
                if (positive) {
                    return [printPlayerModifier('increased' + modifier, valueToPrint)];
                }
                return [printPlayerModifier('decreased' + modifier, valueToPrint)];
            }

            getModifierValue(modifiers, modifier, skillID = undefined) {
                if (!this.isSkillModifier(modifier)) {
                    return this.getSimpleModifier(modifiers, modifier);
                }
                return this.getSkillModifier(modifiers, modifier, skillID);
            }

            getSimpleModifier(modifiers, modifier) {
                // unique
                if (this.isUniqueModifier(modifier)) {
                    return modifiers[modifier];
                }
                // creased
                const increased = modifiers['increased' + modifier];
                const decreased = modifiers['decreased' + modifier];
                return (increased | 0) - (decreased | 0);
            }

            getSkillModifier(modifiers, modifier, skillID) {
                const skillModifiers = modifiers.skillModifiers ? modifiers.skillModifiers : modifiers;
                // unique
                if (this.isUniqueModifier(modifier)) {
                    const map = this.skillModifierMapAux(skillModifiers, modifier);
                    return this.skillModifierAux(map, skillID);
                }
                // creased
                const increased = this.skillModifierMapAux(skillModifiers, 'increased' + modifier);
                const decreased = this.skillModifierMapAux(skillModifiers, 'decreased' + modifier);
                return this.skillModifierAux(increased, skillID) - this.skillModifierAux(decreased, skillID);
            }

            skillModifierMapAux(map, skillID) {
                if (!map) {
                    return [];
                }
                let tmp;
                if (map.constructor.name === 'Map') {
                    tmp = map.get(skillID);
                } else {
                    tmp = map[skillID];
                }
                return tmp ? tmp : [];
            }

            skillModifierAux(map, skillID) {
                if (!map || map.length === 0) {
                    return 0;
                }
                if (map.constructor.name === 'Map') {
                    return map.get(skillID) | 0;
                }
                return map.filter(x => x[0] === skillID)
                    .map(x => x[1])
                    .reduce((a, b) => a + b, 0);
            }

            printModifier(modifiers, modifier, skillIDs) {
                if (!this.isSkillModifier(modifier)) {
                    const value = this.getSimpleModifier(modifiers, modifier);
                    if (this.isUniqueModifier(modifier)) {
                        // unique
                        return this.printUniqueModifier(modifier, value | 0);
                    }
                    // creased
                    return this.printDiffModifier(modifier, value | 0);
                }
                // skillModifiers
                return skillIDs.map(skillID => {
                    const value = this.getSkillModifier(modifiers, modifier, skillID);
                    if (this.isUniqueModifier(modifier)) {
                        // unique
                        return this.printUniqueModifier(modifier, value | 0);
                    }
                    // creased
                    return this.printDiffModifier(modifier, value | 0, skillID);
                }).reduce((a, b) => a.concat(b), []);
            }

            isUniqueModifier(modifier) {
                return modifierData[modifier] !== undefined;
            }

            isSkillModifier(modifier) {
                if (this.isUniqueModifier(modifier)) {
                    return modifierData[modifier].isSkill;
                }
                const data = modifierData['increased' + modifier];
                if (data === undefined) {
                    // this.log(`Unknown modifier ${modifier}`);
                    return false;
                }
                return data.isSkill;
            }

            printRelevantModifiers(modifiers, tag) {
                const relevantNames = this.relevantModifiers[tag].names;
                const skillIDs = this.relevantModifiers[tag].skillIDs;
                const toPrint = [];
                relevantNames.forEach(names => Object.getOwnPropertyNames(names).forEach(name => {
                    this.printModifier(modifiers, name, skillIDs).forEach(result => toPrint.push(result));
                }));
                return toPrint;
            }

            makeTagButton(tag, text, icon) {
                return '<div class="dropdown d-inline-block ml-2">'
                    + '<button type="button" '
                    + 'class="btn btn-sm btn-dual text-combat-smoke" '
                    + 'id="page-header-modifiers" '
                    + `onclick="window.${this.name}.replaceRelevantModifiersHtml(player.modifiers, '${text}', '${tag}');" `
                    + 'aria-haspopup="true" '
                    + 'aria-expanded="true">'
                    + `<img class="skill-icon-xxs" src="${icon}">`
                    + '</button>'
                    + '</div>';
            }

            replaceRelevantModifiersHtml(modifiers, text, tag) {
                $('#show-modifiers').replaceWith(this.printRelevantModifiersHtml(modifiers, text, tag));
            }

            printRelevantModifiersHtml(modifiers, text, tag, id = 'show-modifiers') {
                let passives = `<div id="${id}"><br/>`;
                passives += `<h5 class=\"font-w400 font-size-sm mb-1\">${text}</h5><br/>`;
                this.printRelevantModifiers(modifiers, tag).forEach(toPrint => {
                    passives += `<h5 class=\"font-w400 font-size-sm mb-1 ${toPrint[1]}\">${toPrint[0]}</h5>`;
                });
                passives += '</div>';
                return passives;
            }

            showRelevantModifiers(modifiers, text, tag = 'all') {
                let passives = `<h5 class=\"font-w600 font-size-sm mb-1 text-combat-smoke\">${text}</h5><h5 class=\"font-w600 font-size-sm mb-3 text-warning\"></h5>`;
                passives += `<h5 class="font-w600 font-size-sm mb-3 text-warning"><small>(Does not include non-modifier effects)</small></h5>`;
                passives += this.makeTagButton('all', 'All Modifiers', 'assets/media/main/completion_log.svg');
                passives += this.makeTagButton('golbinRaid', 'Golbin Raid', 'assets/media/main/raid_coins.svg');
                passives += this.makeTagButton('combat', 'Combat', 'assets/media/skills/combat/combat.svg');
                passives += this.makeTagButton('melee', 'Melee', 'assets/media/skills/attack/attack.svg');
                passives += this.makeTagButton('ranged', 'Ranged', 'assets/media/skills/ranged/ranged.svg');
                passives += this.makeTagButton('magic', 'Combat Magic', 'assets/media/skills/combat/spellbook.svg');
                passives += this.makeTagButton('slayer', 'Slayer', 'assets/media/skills/slayer/slayer.svg');
                passives += '<br/>';
                this.gatheringSkills.forEach(skill => passives += this.makeTagButton(skill, skill, `assets/media/skills/${skill.toLowerCase()}/${skill.toLowerCase()}.svg`));
                passives += '<br/>';
                this.productionSkills.forEach(skill => passives += this.makeTagButton(skill, skill, `assets/media/skills/${skill.toLowerCase()}/${skill.toLowerCase()}.svg`));
                passives += this.makeTagButton('altMagic', 'Alt. Magic', 'assets/media/skills/magic/magic.svg');
                passives += this.printRelevantModifiersHtml(modifiers, 'All Modifiers', tag);
                Swal.fire({
                    html: passives,
                });
            }
        }
        // end of ShowModifiers copy

        // equipment stats are non-passive stats that apply to combat
        MICSR.modifierNames = {
            // general modifiers
            ChanceToDoubleItemsGlobal: {implemented: true},
            ChanceToPreservePotionCharge: {implemented: true},
            SummoningChargePreservation: {implemented: true},
            GPFromSales: {implemented: false}, // kind of iffy to implement, you might change setup to sell items
            GPGlobal: {implemented: true},
            GPOnEnemyHit: {implemented: true},
            GlobalSkillXP: {implemented: true},
            HiddenSkillLevel: {implemented: true},
            PotionChargesFlat: {implemented: true},
            SkillXP: {implemented: true},
            // modifiers that only relate to combat and are not classified in a finer group
            AttackRolls: {implemented: true},
            ChanceToDoubleLootCombat: {implemented: true},
            DamageToAllMonsters: {implemented: true},
            DamageToBosses: {implemented: true},
            DamageToCombatAreaMonsters: {implemented: true},
            DamageToDungeonMonsters: {implemented: true},
            GPFromMonsters: {implemented: true},
            GPFromMonstersFlat: {implemented: true},
            GlobalAccuracy: {implemented: true},
            MaxHitFlat: {implemented: true},
            MaxHitPercent: {implemented: true},
            MaxHitpoints: {implemented: true},
            MinHitBasedOnMaxHit: {implemented: true},
            MonsterRespawnTimer: {implemented: true},
            AttackInterval: {implemented: false},
            AttackIntervalPercent: {implemented: false},
            ChanceToApplyBurn: {implemented: true},
            // modifiers that relate to healing
            AutoEatEfficiency: {implemented: true},
            AutoEatHPLimit: {implemented: true},
            AutoEatThreshold: {implemented: true},
            FoodHealingValue: {implemented: true},
            HPRegenFlat: {implemented: true},
            HitpointRegeneration: {implemented: true},
            Lifesteal: {implemented: false}, // not implemented in game
            // modifiers that relate to defence
            DamageReduction: {implemented: true},
            MagicEvasion: {implemented: true},
            MeleeEvasion: {implemented: true},
            RangedEvasion: {implemented: true},
            ReflectDamage: {implemented: false}, // not implemented in game
            // modifiers that relate to using melee attacks
            MeleeAccuracyBonus: {implemented: true},
            MeleeStrengthBonus: {implemented: true},
            // modifiers that relate to using ranged attacks
            AmmoPreservation: {implemented: true},
            RangedAccuracyBonus: {implemented: true},
            RangedStrengthBonus: {implemented: true},
            // modifiers that relate to using magic attacks
            MagicAccuracyBonus: {implemented: true},
            MagicDamageBonus: {implemented: true},
            MinAirSpellDmg: {implemented: true},
            MinEarthSpellDmg: {implemented: true},
            MinFireSpellDmg: {implemented: true},
            MinWaterSpellDmg: {implemented: true},
            RunePreservation: {implemented: true},
            // modifiers that relate to slayer tasks, areas, or monsters
            DamageToSlayerAreaMonsters: {implemented: true},
            DamageToSlayerTasks: {implemented: true},
            SlayerAreaEffectNegationFlat: {implemented: true},
            SlayerCoins: {implemented: true},
            SlayerTaskLength: {implemented: true},
            // modifiers that relate to prayer
            ChanceToPreservePrayerPoints: {implemented: true},
            FlatPrayerCostReduction: {implemented: true},
        }

        MICSR.showModifiersInstance = new MICSR.ShowModifiers('', 'MICSR');

        // check for combat modifiers that do not have an implemented check
        if (MICSR.isDev) {
            MICSR.showModifiersInstance.relevantModifiers.combat.names.forEach(set => {
                Object.getOwnPropertyNames(set).forEach(modifier => {
                    if (MICSR.modifierNames[modifier] === undefined) {
                        MICSR.warn(`Combat modifier ${modifier} has no implementation check.`);
                    }
                });
            });
        }

        // report stats that have an implemented check, but are not implemented
        MICSR.checkImplemented(MICSR.modifierNames, 'Player combat modifier');
    }

    let loadCounter = 0;
    const waitLoadOrder = (reqs, setup, id) => {
        if (characterSelected && !characterLoading) {
            loadCounter++;
        }
        if (loadCounter > 100) {
            console.log('Failed to load ' + id);
            return;
        }
        // check requirements
        let reqMet = characterSelected && !characterLoading;
        if (window.MICSR === undefined) {
            reqMet = false;
            console.log(id + ' is waiting for the MICSR object');
        } else {
            for (const req of reqs) {
                if (window.MICSR.loadedFiles[req]) {
                    continue;
                }
                reqMet = false;
                // not defined yet: try again later
                if (loadCounter === 1) {
                    window.MICSR.log(id + ' is waiting for ' + req);
                }
            }
        }
        if (!reqMet) {
            setTimeout(() => waitLoadOrder(reqs, setup, id), 50);
            return;
        }
        // requirements met
        window.MICSR.log('setting up ' + id);
        setup();
        // mark as loaded
        window.MICSR.loadedFiles[id] = true;
    }
    waitLoadOrder(reqs, setup, 'modifierNames');

})();