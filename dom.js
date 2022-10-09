window.dom = {
    /** 增加dom标签*/
    //创建节点
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim();//可能有空格
        return container.content.firstChild;
    },
    //目标后面创建
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    //目标前面创建
    Before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    //添加子节点
    append(parent, node) {
        parent.append(node);
    },
    //添加父节点
    wrap(node, parent) {
        dom.Before(node, parent)
        dom.append(parent, node)
    },

    /** 删除dom标签*/
    //删除单个节点
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    //删除多个子节点
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },

    /**改变dom节点标签 */
    //添加title
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    //添加文本
    text(node, string) {
        // dom.text(test, '这是新的内容')
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
            // dom.text(test)
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {
        if (arguments, length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        //dom.style(div,'color','red')
        if (arguments.length === 3) {
            node.style[name] = value
            //dom.style(div,'color')
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
                //dom.style(div,{color:'red'})
            } else if (name instanceof Object) {
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },

    /**查询dom数据 */
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
};
