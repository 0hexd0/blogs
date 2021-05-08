# Ocaml语言

## Tuple和List

Tuple是有序集合，集合中的值可以是不同类型
List数量任意，类型相同的元素集合

可以用pattern-matching抽取tuple的组件
(x, y) = a_tuple
类比js中的解构语法

## 模式匹配

``` ocaml

    let my_favorite_language languages = 
        match languages with
        | first :: the_rest -> first
        | [] -> "Ocaml"
        ;;
    my_favorite_language ["aa"; "bb"; "cc"];;

```

