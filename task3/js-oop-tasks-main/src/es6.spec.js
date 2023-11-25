const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(!!dic, true);
        });
        it('Обработка верных значений', () => {
            const dic = new core.Dictionary();
            dic.set("test1", "test1")
            assert.strictEqual(dic.get("test1"), "test1");
        });
        it('Обработка неверных значений', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.set(21, "test1") || dic.set("test1", 21) || dic.set(21, 21), false);
        });
        it('Проверка remove', () => {
            const dic = new core.Dictionary();
            dic.set("test1", "test1")
            dic.set("test2", "test2")
            assert.strictEqual(dic.remove("test1"), true);
        });
        it('Проверка remove, когда такого слова нет', () => {
            const dic = new core.Dictionary();
            dic.set("test1", "test1")
            dic.set("test2", "test2")
            assert.strictEqual(dic.remove("test4"), false);
        });
        it('Проверка remove, когда передали неверный тип', () => {
            const dic = new core.Dictionary();
            dic.set("test1", "test1")
            dic.set("test2", "test2")
            assert.strictEqual(dic.remove(213), false);
        });
        it('Проверка showSelectedWord, когда передали неверный тип', () => {
            const dic = new core.Dictionary();
            dic.set("test1", "test1")
            assert.strictEqual(dic.showSelectedWord(213), false);
        });
        it('Проверка showSelectedWord, когда передали неверный тип', () => {
            const dic = new core.Dictionary();
            dic.set("test1", "test1")
            assert.strictEqual(dic.showSelectedWord('test2'), false);
        });
    });
});