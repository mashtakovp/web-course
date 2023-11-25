"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio = "Иванов Иван Иванович") {
    const name = fio.split(" ")
    return name[1] + " " + name[0]
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    let newSet = new Set(array)
    return Array.from(newSet)
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    try {
        const max = array.reduce(function (acc, item) {
            if (acc < item)
                acc = item
            return acc
        })
        const min = array.reduce(function (acc, item) {
            if (acc > item)
                acc = item
            return acc
        })
        return (max / min)
    } catch (err){
        console.log("size === 0")
    }
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor() {
        this.map = new Map()
    }
    get(def){
        if(typeof def === 'string')
            return this.map.get(def)
    }
    set(def, desc){
        if(typeof def === 'string' && typeof desc === 'string')
            this.map.set(def, desc)
        else
            return false
    }
    remove(def){
        if(typeof def === 'string')
            return this.map.delete(def)
        else
            return false 
    }
    showSelectedWord(def){
        if(typeof def === 'string')
            if(this.map.has(def))
                console.log(def + " " + this.get(def))
            else
                return false
        else
           return false
    }
    showAllWords(){
        for(let key of this.map.keys())
            console.log(key + " " + this.get(key))
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
